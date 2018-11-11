package org.training.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByLogin(String login);

    User findByMail(String mail);
}
