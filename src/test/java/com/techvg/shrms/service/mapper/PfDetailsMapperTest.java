package com.techvg.shrms.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PfDetailsMapperTest {

    private PfDetailsMapper pfDetailsMapper;

    @BeforeEach
    public void setUp() {
        pfDetailsMapper = new PfDetailsMapperImpl();
    }
}
