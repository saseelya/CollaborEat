package learn.collaboreat.data;



import learn.collaboreat.models.User;

import java.util.List;

public interface UserRepository {

    List<User> findAll();

    User findById(int userId);

    User findByEmail(String email);

    User add(User user);

    boolean update(User user);

    boolean updatePassword(User user);

    boolean delete(User user);
}
