package learn.collaboreat.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/user").permitAll()
                .antMatchers("/user/{userId}").permitAll()
                .antMatchers("/user/create_account_user").permitAll()
                .antMatchers("/user/create_account_admin").permitAll()
                .antMatchers("/feedback").permitAll()
                .antMatchers("/feedback/{feedbackId}").permitAll()
                .antMatchers("/healthInfo").permitAll()
                .antMatchers("/healthInfo/{healthInfoId}").permitAll()
                .antMatchers("/mealType").permitAll()
                .antMatchers("/mealType/{mealTypeId}").permitAll()
                .antMatchers("/recipe").permitAll()
                .antMatchers("/recipe/{recipeId}/").permitAll()
                .antMatchers("/recipe/edit/{recipeId}/").permitAll()
                .antMatchers("/recipe/delete/{recipeId}/").permitAll()
                .antMatchers("/recipe/healthInfo").permitAll()
                .antMatchers("/recipe/healthInfo/{recipeId}/{healthInfoId}").permitAll()
                .antMatchers("/recipe/user/{userId}").permitAll()
                .antMatchers("/user/edit/{userId}").permitAll()
                .antMatchers("/recipe/add").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/").permitAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }

}
