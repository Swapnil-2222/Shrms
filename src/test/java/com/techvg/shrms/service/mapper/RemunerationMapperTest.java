package com.techvg.shrms.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RemunerationMapperTest {

    private RemunerationMapper remunerationMapper;

    @BeforeEach
    public void setUp() {
        remunerationMapper = new RemunerationMapperImpl();
    }
}
