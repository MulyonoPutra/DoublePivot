package com.labs.doublepivot.services;

import com.labs.doublepivot.domain.entities.Role;
import com.labs.doublepivot.domain.enums.RoleName;

import java.util.Optional;

public interface RoleService {

    public Optional<Role> findByRoleName(RoleName roleName);

    public void save(Role role);
}
