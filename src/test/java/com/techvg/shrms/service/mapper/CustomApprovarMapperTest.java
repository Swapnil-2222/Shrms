package com.techvg.shrms.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CustomApprovarMapperTest {

    private CustomApprovarMapper customApprovarMapper;

    @BeforeEach
    public void setUp() {
        customApprovarMapper = new CustomApprovarMapperImpl();
    }
}
