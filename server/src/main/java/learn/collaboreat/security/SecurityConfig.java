package learn.collaboreat.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
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
                .antMatchers("/user/create_account_admin").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/user/edit/{userId}").permitAll()
                .antMatchers(HttpMethod.DELETE, "/user/delete/{userId}").permitAll()
                .antMatchers("/user/refresh_token").authenticated()
                .antMatchers("/user/authenticate").permitAll()

                .antMatchers("/healthInfo").hasRole("ADMIN")
                .antMatchers("/healthInfo/{healthInfoId}").permitAll()
                .antMatchers("/mealType").hasRole("ADMIN")
                .antMatchers("/mealType/{mealTypeId}").permitAll()

                .antMatchers("/feedback").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/feedback/{feedbackId}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,"/feedback/{feedbackId}").hasAnyRole("USER", "ADMIN")
                .antMatchers("/feedback/rating/{recipeId}").permitAll()
                .antMatchers(HttpMethod.POST,"/feedback/add").hasAnyRole("USER", "ADMIN")

                .antMatchers("/recipe").permitAll()
                .antMatchers("/recipe/{recipeId}").permitAll()
                .antMatchers(HttpMethod.POST,"/recipe/add").hasAnyRole("USER", "ADMIN")
                .antMatchers("/recipe/edit/{recipeId}/").hasAnyRole("USER", "ADMIN")
                .antMatchers("/recipe/delete/{recipeId}/").hasAnyRole("USER", "ADMIN")
                .antMatchers("/recipe/healthInfo").hasRole("ADMIN")
                .antMatchers("/recipe/healthInfo/{recipeId}").permitAll()
                .antMatchers("/recipe/user/{userId}").permitAll()
                .antMatchers("/recipe/food/{food}").permitAll()
                .antMatchers("/recipe/mealType/{mealTypeId}").permitAll()
                .antMatchers("/recipe/mealType/all/{mealTypeId}").permitAll()
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
                        .allowedOrigins("http://localhost:3000", "http://collaboreat.s3.us-east-2.amazonaws.com")
                        .allowedMethods("*");
            }
        };
    }

}
