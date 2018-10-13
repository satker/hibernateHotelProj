package org.training.example.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String email);

    Optional<User> findById(long id);
}
