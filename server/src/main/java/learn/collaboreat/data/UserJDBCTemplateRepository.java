package learn.collaboreat.data;

import learn.collaboreat.data.mappers.RecipeMapper;
import learn.collaboreat.data.mappers.UserMapper;
import learn.collaboreat.models.Recipe;
import learn.collaboreat.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserJDBCTemplateRepository implements UserRepository{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RecipeRepository recipeRepository;

    public UserJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select userId, firstName, lastName, email, password, `disabled` " +
                "from user;";

        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    public User findByEmail(String email) {
        final String sql = "select userId, firstName, lastName, email, password, `disabled` " +
                "from user where email = ?;";

        User user = jdbcTemplate.query(sql, new UserMapper(), email).stream()
                .findFirst().orElse(null);

        if (user != null) {
            user.setRoles(getRolesByUserId(user.getUserId()));
            addRecipes(user);
        }

        return user;
    }

    @Override
    public User findById(int userId) {
        final String sql = "select userId, firstName, lastName, email, password, `disabled` " +
                "from user where userId = ?;";

        User user = jdbcTemplate.query(sql, new UserMapper(), userId).stream()
                .findFirst().orElse(null);

        if (user != null) {
            addRecipes(user);
        }

        return user;
    }

    @Override
    @Transactional
    public User add(User user) {
        final String sql = "insert into user (firstName, lastname, email, password) " +
                "values (?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getPassword());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        }
        user.setUserId(keyHolder.getKey().intValue());
        updateRoles(user);
        return user;
    }

    @Override
    @Transactional
    public boolean update(User user) {
        final String sql = "update user set "
                + "firstName = ?, "
                + "lastName = ?, "
                + "email = ?, "
                + "disabled = ? "
                + "where userId = ?;";

        return jdbcTemplate.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.isDisabled(),
                user.getUserId()) > 0;
    }

    @Override
    public boolean updatePassword(User user) {
        final String sql = "update user set " +
                "password = ? "
                + "where userId = ?;";

        return jdbcTemplate.update(sql,
                user.getPassword(),
                user.getUserId()) > 0;
    }

    @Override
    @Transactional
    public boolean delete(User user) {
        for (Recipe r : user.getRecipes()) {
            recipeRepository.deleteById(r.getRecipeId());
        }
        jdbcTemplate.update("delete from userRole where userId = ?;", user.getUserId());
        jdbcTemplate.update("delete from feedback where userId = ?;", user.getUserId());
        return jdbcTemplate.update("delete from user where userId = ?;", user.getUserId()) > 0;
    }

    private void addRecipes(User user) {
        final String sql = "select recipeId, recipeName, recipeStory, recipeDescription, recipeIngredients, " +
                "recipeCookTime, recipeCookTime, recipeSteps, recipeDate, recipeRating, " +
                "userId, mealTypeId " +
                "from recipe where userId = ?;";

        var userRecipes = jdbcTemplate.query(sql, new RecipeMapper(), user.getUserId());
        user.setRecipes(userRecipes);
    }

    private void updateRoles(User user) {
        jdbcTemplate.update("delete from userRole where userId = ?;", user.getUserId());

        if (user.getRoles() == null) {
            return;
        }

        for (String roleName : user.getRoles()) {
            String sql = "insert into userRole (userId, roleId) " +
                    "select ?, roleId from role where `name` = ?;";

            jdbcTemplate.update(sql, user.getUserId(), roleName);
        }
    }

    private List<String> getRolesByUserId(int userId) {
        final String sql = "select r.name " +
                "from userRole ur " +
                "inner join role r on ur.roleId = r.roleId " +
                "where ur.userId = ?;";

        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), userId);
    }
}
