package com.labs.doublepivot.services.serviceImpl;

import com.labs.doublepivot.domain.entities.User;
import com.labs.doublepivot.domain.entities.UserPrincipal;
import com.labs.doublepivot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username).get();
        return UserPrincipal.build(user);
    }

}
