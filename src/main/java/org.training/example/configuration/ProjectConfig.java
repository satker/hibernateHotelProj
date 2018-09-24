package org.training.example.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan
@PropertySource("classpath:application.properties")
public class ProjectConfig {
    @Value("${dataSource.driverClassName}")
    private String driverClassName;

    @Value("${dataSource.url}")
    private String url;

    @Value("${dataSource.username}")
    private String userName;

    @Value("${dataSource.password}")
    private String password;

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUsername(userName);
        dataSource.setPassword(password);
        dataSource.setUrl(url);
        dataSource.setDriverClassName(driverClassName);
        return dataSource;
    }
}
