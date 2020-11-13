package learn.collaboreat.domain;

import learn.collaboreat.data.RecipeRepository;
import learn.collaboreat.data.RoleRepository;
import learn.collaboreat.data.UserRepository;
import learn.collaboreat.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private RecipeRepository recipeRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository,
                       RecipeRepository recipeRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder encoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if (user == null || user.isDisabled()) {
            throw new UsernameNotFoundException(email + " not found.");
        }

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(roleName -> new SimpleGrantedAuthority("ROLE_" + roleName))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);

    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(int userId) {
        return userRepository.findById(userId);
    }

    public Result<User> add(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User must exist.", ResultType.INVALID);
            return result;
        }

        result = validatePassword(user, result);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() != 0) {
            result.addMessage("User ID must not be set in order to add.", ResultType.INVALID);
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user = userRepository.add(user);
        result.setPayload(user);
        return result;
    }

    public Result<User> update(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User must exist.", ResultType.INVALID);
            return result;
        }

        if (user.getUserId() <= 0) {
            result.addMessage("User ID must be set in order to update.", ResultType.INVALID);
            return result;
        }

        if (!userRepository.update(user)) {
            String msg = String.format("userId %s not found.", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<User> updatePassword(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User must exist.", ResultType.INVALID);
            return result;
        }

        if (user.getUserId() <= 0) {
            result.addMessage("User ID must be set in order to update.", ResultType.INVALID);
            return result;
        }

        result = validatePassword(user, result);
        if (!result.isSuccess()) {
            return result;
        }

        if (!userRepository.updatePassword(user)) {
            String msg = String.format("userId %s not found.", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<User> delete(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User must exist to be deleted.", ResultType.INVALID);
            return result;
        }
        if (!userRepository.delete(user)) {
            String msg = String.format("userId %s not found.", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<User> validatePassword(User user, Result<User> result) {
        String password = user.getPassword();
        if (password == null || password.length() < 8) {
            result.addMessage("Password must be at least 8 characters.", ResultType.INVALID);
            return result;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            result.addMessage("Password must contain a digit, a letter, and a non-digit/non-letter", ResultType.INVALID);
        }
        return result;
    }

}
