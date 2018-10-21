package org.training.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.Capacity;

@Repository
public interface CapacityRepository extends JpaRepository<Capacity, Long> {
    Capacity findCapacityByValue(byte value);
}
