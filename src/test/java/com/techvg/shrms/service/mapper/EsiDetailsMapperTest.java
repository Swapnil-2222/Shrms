package com.techvg.shrms.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EsiDetailsMapperTest {

    private EsiDetailsMapper esiDetailsMapper;

    @BeforeEach
    public void setUp() {
        esiDetailsMapper = new EsiDetailsMapperImpl();
    }
}
