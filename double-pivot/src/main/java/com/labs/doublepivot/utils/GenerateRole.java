package com.labs.doublepivot.utils;

import com.labs.doublepivot.domain.entities.Role;
import com.labs.doublepivot.domain.enums.RoleName;
import com.labs.doublepivot.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Important!
 * This class will only run once to create this role,
 * Once created the code should be eliminator or commented
 */

@Component
public class GenerateRole implements CommandLineRunner {

    @Autowired
    RoleService roleService;

    @Override
    public void run(String... args) throws Exception {
//     Role rolAdmin = new Role(RoleName.ROLE_ADMIN);
//     Role rolUser = new Role(RoleName.ROLE_USER);
//     roleService.save(rolAdmin);
//     roleService.save(rolUser);
    }
}
