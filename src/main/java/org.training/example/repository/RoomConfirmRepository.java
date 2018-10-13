package org.training.example.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.RoomConfirm;

@Repository
public interface RoomConfirmRepository extends JpaRepository<RoomConfirm, Long> {
    Collection<RoomConfirm> findByUserId(long id);

    RoomConfirm findOne(long id);
}
