package com.labs.doublepivot.services.serviceImpl;

import com.labs.doublepivot.domain.entities.Role;
import com.labs.doublepivot.domain.enums.RoleName;
import com.labs.doublepivot.repositories.RoleRepository;
import com.labs.doublepivot.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired RoleRepository roleRepository;

    @Override
    public Optional<Role> findByRoleName(RoleName roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    @Override
    public void save(Role role) {
        roleRepository.save(role);
    }
}
