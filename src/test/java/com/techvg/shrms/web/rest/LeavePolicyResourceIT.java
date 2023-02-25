package com.techvg.shrms.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.techvg.shrms.IntegrationTest;
import com.techvg.shrms.domain.LeavePolicy;
import com.techvg.shrms.repository.LeavePolicyRepository;
import com.techvg.shrms.service.criteria.LeavePolicyCriteria;
import com.techvg.shrms.service.dto.LeavePolicyDTO;
import com.techvg.shrms.service.mapper.LeavePolicyMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link LeavePolicyResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LeavePolicyResourceIT {

    private static final String DEFAULT_LEAVE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_LEAVE_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CARRY_FORWORD = false;
    private static final Boolean UPDATED_IS_CARRY_FORWORD = true;

    private static final String DEFAULT_EMPLOYEE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER_LEAVE = "AAAAAAAAAA";
    private static final String UPDATED_GENDER_LEAVE = "BBBBBBBBBB";

    private static final String DEFAULT_TOTAL_LEAVE = "AAAAAAAAAA";
    private static final String UPDATED_TOTAL_LEAVE = "BBBBBBBBBB";

    private static final String DEFAULT_MAX_LEAVE = "AAAAAAAAAA";
    private static final String UPDATED_MAX_LEAVE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HASPRO_RATA_LEAVE = false;
    private static final Boolean UPDATED_HASPRO_RATA_LEAVE = true;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_COMPANY_ID = 1L;
    private static final Long UPDATED_COMPANY_ID = 2L;
    private static final Long SMALLER_COMPANY_ID = 1L - 1L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/leave-policies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LeavePolicyRepository leavePolicyRepository;

    @Autowired
    private LeavePolicyMapper leavePolicyMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLeavePolicyMockMvc;

    private LeavePolicy leavePolicy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LeavePolicy createEntity(EntityManager em) {
        LeavePolicy leavePolicy = new LeavePolicy()
            .leaveType(DEFAULT_LEAVE_TYPE)
            .isCarryForword(DEFAULT_IS_CARRY_FORWORD)
            .employeeType(DEFAULT_EMPLOYEE_TYPE)
            .genderLeave(DEFAULT_GENDER_LEAVE)
            .totalLeave(DEFAULT_TOTAL_LEAVE)
            .maxLeave(DEFAULT_MAX_LEAVE)
            .hasproRataLeave(DEFAULT_HASPRO_RATA_LEAVE)
            .description(DEFAULT_DESCRIPTION)
            .companyId(DEFAULT_COMPANY_ID)
            .status(DEFAULT_STATUS)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return leavePolicy;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LeavePolicy createUpdatedEntity(EntityManager em) {
        LeavePolicy leavePolicy = new LeavePolicy()
            .leaveType(UPDATED_LEAVE_TYPE)
            .isCarryForword(UPDATED_IS_CARRY_FORWORD)
            .employeeType(UPDATED_EMPLOYEE_TYPE)
            .genderLeave(UPDATED_GENDER_LEAVE)
            .totalLeave(UPDATED_TOTAL_LEAVE)
            .maxLeave(UPDATED_MAX_LEAVE)
            .hasproRataLeave(UPDATED_HASPRO_RATA_LEAVE)
            .description(UPDATED_DESCRIPTION)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return leavePolicy;
    }

    @BeforeEach
    public void initTest() {
        leavePolicy = createEntity(em);
    }

    @Test
    @Transactional
    void createLeavePolicy() throws Exception {
        int databaseSizeBeforeCreate = leavePolicyRepository.findAll().size();
        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);
        restLeavePolicyMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isCreated());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeCreate + 1);
        LeavePolicy testLeavePolicy = leavePolicyList.get(leavePolicyList.size() - 1);
        assertThat(testLeavePolicy.getLeaveType()).isEqualTo(DEFAULT_LEAVE_TYPE);
        assertThat(testLeavePolicy.getIsCarryForword()).isEqualTo(DEFAULT_IS_CARRY_FORWORD);
        assertThat(testLeavePolicy.getEmployeeType()).isEqualTo(DEFAULT_EMPLOYEE_TYPE);
        assertThat(testLeavePolicy.getGenderLeave()).isEqualTo(DEFAULT_GENDER_LEAVE);
        assertThat(testLeavePolicy.getTotalLeave()).isEqualTo(DEFAULT_TOTAL_LEAVE);
        assertThat(testLeavePolicy.getMaxLeave()).isEqualTo(DEFAULT_MAX_LEAVE);
        assertThat(testLeavePolicy.getHasproRataLeave()).isEqualTo(DEFAULT_HASPRO_RATA_LEAVE);
        assertThat(testLeavePolicy.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLeavePolicy.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testLeavePolicy.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testLeavePolicy.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testLeavePolicy.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void createLeavePolicyWithExistingId() throws Exception {
        // Create the LeavePolicy with an existing ID
        leavePolicy.setId(1L);
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        int databaseSizeBeforeCreate = leavePolicyRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeavePolicyMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLeavePolicies() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leavePolicy.getId().intValue())))
            .andExpect(jsonPath("$.[*].leaveType").value(hasItem(DEFAULT_LEAVE_TYPE)))
            .andExpect(jsonPath("$.[*].isCarryForword").value(hasItem(DEFAULT_IS_CARRY_FORWORD.booleanValue())))
            .andExpect(jsonPath("$.[*].employeeType").value(hasItem(DEFAULT_EMPLOYEE_TYPE)))
            .andExpect(jsonPath("$.[*].genderLeave").value(hasItem(DEFAULT_GENDER_LEAVE)))
            .andExpect(jsonPath("$.[*].totalLeave").value(hasItem(DEFAULT_TOTAL_LEAVE)))
            .andExpect(jsonPath("$.[*].maxLeave").value(hasItem(DEFAULT_MAX_LEAVE)))
            .andExpect(jsonPath("$.[*].hasproRataLeave").value(hasItem(DEFAULT_HASPRO_RATA_LEAVE.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }

    @Test
    @Transactional
    void getLeavePolicy() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get the leavePolicy
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL_ID, leavePolicy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(leavePolicy.getId().intValue()))
            .andExpect(jsonPath("$.leaveType").value(DEFAULT_LEAVE_TYPE))
            .andExpect(jsonPath("$.isCarryForword").value(DEFAULT_IS_CARRY_FORWORD.booleanValue()))
            .andExpect(jsonPath("$.employeeType").value(DEFAULT_EMPLOYEE_TYPE))
            .andExpect(jsonPath("$.genderLeave").value(DEFAULT_GENDER_LEAVE))
            .andExpect(jsonPath("$.totalLeave").value(DEFAULT_TOTAL_LEAVE))
            .andExpect(jsonPath("$.maxLeave").value(DEFAULT_MAX_LEAVE))
            .andExpect(jsonPath("$.hasproRataLeave").value(DEFAULT_HASPRO_RATA_LEAVE.booleanValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.lastModified").value(DEFAULT_LAST_MODIFIED.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }

    @Test
    @Transactional
    void getLeavePoliciesByIdFiltering() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        Long id = leavePolicy.getId();

        defaultLeavePolicyShouldBeFound("id.equals=" + id);
        defaultLeavePolicyShouldNotBeFound("id.notEquals=" + id);

        defaultLeavePolicyShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultLeavePolicyShouldNotBeFound("id.greaterThan=" + id);

        defaultLeavePolicyShouldBeFound("id.lessThanOrEqual=" + id);
        defaultLeavePolicyShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLeaveTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where leaveType equals to DEFAULT_LEAVE_TYPE
        defaultLeavePolicyShouldBeFound("leaveType.equals=" + DEFAULT_LEAVE_TYPE);

        // Get all the leavePolicyList where leaveType equals to UPDATED_LEAVE_TYPE
        defaultLeavePolicyShouldNotBeFound("leaveType.equals=" + UPDATED_LEAVE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLeaveTypeIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where leaveType in DEFAULT_LEAVE_TYPE or UPDATED_LEAVE_TYPE
        defaultLeavePolicyShouldBeFound("leaveType.in=" + DEFAULT_LEAVE_TYPE + "," + UPDATED_LEAVE_TYPE);

        // Get all the leavePolicyList where leaveType equals to UPDATED_LEAVE_TYPE
        defaultLeavePolicyShouldNotBeFound("leaveType.in=" + UPDATED_LEAVE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLeaveTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where leaveType is not null
        defaultLeavePolicyShouldBeFound("leaveType.specified=true");

        // Get all the leavePolicyList where leaveType is null
        defaultLeavePolicyShouldNotBeFound("leaveType.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLeaveTypeContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where leaveType contains DEFAULT_LEAVE_TYPE
        defaultLeavePolicyShouldBeFound("leaveType.contains=" + DEFAULT_LEAVE_TYPE);

        // Get all the leavePolicyList where leaveType contains UPDATED_LEAVE_TYPE
        defaultLeavePolicyShouldNotBeFound("leaveType.contains=" + UPDATED_LEAVE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLeaveTypeNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where leaveType does not contain DEFAULT_LEAVE_TYPE
        defaultLeavePolicyShouldNotBeFound("leaveType.doesNotContain=" + DEFAULT_LEAVE_TYPE);

        // Get all the leavePolicyList where leaveType does not contain UPDATED_LEAVE_TYPE
        defaultLeavePolicyShouldBeFound("leaveType.doesNotContain=" + UPDATED_LEAVE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByIsCarryForwordIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where isCarryForword equals to DEFAULT_IS_CARRY_FORWORD
        defaultLeavePolicyShouldBeFound("isCarryForword.equals=" + DEFAULT_IS_CARRY_FORWORD);

        // Get all the leavePolicyList where isCarryForword equals to UPDATED_IS_CARRY_FORWORD
        defaultLeavePolicyShouldNotBeFound("isCarryForword.equals=" + UPDATED_IS_CARRY_FORWORD);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByIsCarryForwordIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where isCarryForword in DEFAULT_IS_CARRY_FORWORD or UPDATED_IS_CARRY_FORWORD
        defaultLeavePolicyShouldBeFound("isCarryForword.in=" + DEFAULT_IS_CARRY_FORWORD + "," + UPDATED_IS_CARRY_FORWORD);

        // Get all the leavePolicyList where isCarryForword equals to UPDATED_IS_CARRY_FORWORD
        defaultLeavePolicyShouldNotBeFound("isCarryForword.in=" + UPDATED_IS_CARRY_FORWORD);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByIsCarryForwordIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where isCarryForword is not null
        defaultLeavePolicyShouldBeFound("isCarryForword.specified=true");

        // Get all the leavePolicyList where isCarryForword is null
        defaultLeavePolicyShouldNotBeFound("isCarryForword.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByEmployeeTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where employeeType equals to DEFAULT_EMPLOYEE_TYPE
        defaultLeavePolicyShouldBeFound("employeeType.equals=" + DEFAULT_EMPLOYEE_TYPE);

        // Get all the leavePolicyList where employeeType equals to UPDATED_EMPLOYEE_TYPE
        defaultLeavePolicyShouldNotBeFound("employeeType.equals=" + UPDATED_EMPLOYEE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByEmployeeTypeIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where employeeType in DEFAULT_EMPLOYEE_TYPE or UPDATED_EMPLOYEE_TYPE
        defaultLeavePolicyShouldBeFound("employeeType.in=" + DEFAULT_EMPLOYEE_TYPE + "," + UPDATED_EMPLOYEE_TYPE);

        // Get all the leavePolicyList where employeeType equals to UPDATED_EMPLOYEE_TYPE
        defaultLeavePolicyShouldNotBeFound("employeeType.in=" + UPDATED_EMPLOYEE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByEmployeeTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where employeeType is not null
        defaultLeavePolicyShouldBeFound("employeeType.specified=true");

        // Get all the leavePolicyList where employeeType is null
        defaultLeavePolicyShouldNotBeFound("employeeType.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByEmployeeTypeContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where employeeType contains DEFAULT_EMPLOYEE_TYPE
        defaultLeavePolicyShouldBeFound("employeeType.contains=" + DEFAULT_EMPLOYEE_TYPE);

        // Get all the leavePolicyList where employeeType contains UPDATED_EMPLOYEE_TYPE
        defaultLeavePolicyShouldNotBeFound("employeeType.contains=" + UPDATED_EMPLOYEE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByEmployeeTypeNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where employeeType does not contain DEFAULT_EMPLOYEE_TYPE
        defaultLeavePolicyShouldNotBeFound("employeeType.doesNotContain=" + DEFAULT_EMPLOYEE_TYPE);

        // Get all the leavePolicyList where employeeType does not contain UPDATED_EMPLOYEE_TYPE
        defaultLeavePolicyShouldBeFound("employeeType.doesNotContain=" + UPDATED_EMPLOYEE_TYPE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByGenderLeaveIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where genderLeave equals to DEFAULT_GENDER_LEAVE
        defaultLeavePolicyShouldBeFound("genderLeave.equals=" + DEFAULT_GENDER_LEAVE);

        // Get all the leavePolicyList where genderLeave equals to UPDATED_GENDER_LEAVE
        defaultLeavePolicyShouldNotBeFound("genderLeave.equals=" + UPDATED_GENDER_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByGenderLeaveIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where genderLeave in DEFAULT_GENDER_LEAVE or UPDATED_GENDER_LEAVE
        defaultLeavePolicyShouldBeFound("genderLeave.in=" + DEFAULT_GENDER_LEAVE + "," + UPDATED_GENDER_LEAVE);

        // Get all the leavePolicyList where genderLeave equals to UPDATED_GENDER_LEAVE
        defaultLeavePolicyShouldNotBeFound("genderLeave.in=" + UPDATED_GENDER_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByGenderLeaveIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where genderLeave is not null
        defaultLeavePolicyShouldBeFound("genderLeave.specified=true");

        // Get all the leavePolicyList where genderLeave is null
        defaultLeavePolicyShouldNotBeFound("genderLeave.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByGenderLeaveContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where genderLeave contains DEFAULT_GENDER_LEAVE
        defaultLeavePolicyShouldBeFound("genderLeave.contains=" + DEFAULT_GENDER_LEAVE);

        // Get all the leavePolicyList where genderLeave contains UPDATED_GENDER_LEAVE
        defaultLeavePolicyShouldNotBeFound("genderLeave.contains=" + UPDATED_GENDER_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByGenderLeaveNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where genderLeave does not contain DEFAULT_GENDER_LEAVE
        defaultLeavePolicyShouldNotBeFound("genderLeave.doesNotContain=" + DEFAULT_GENDER_LEAVE);

        // Get all the leavePolicyList where genderLeave does not contain UPDATED_GENDER_LEAVE
        defaultLeavePolicyShouldBeFound("genderLeave.doesNotContain=" + UPDATED_GENDER_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByTotalLeaveIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where totalLeave equals to DEFAULT_TOTAL_LEAVE
        defaultLeavePolicyShouldBeFound("totalLeave.equals=" + DEFAULT_TOTAL_LEAVE);

        // Get all the leavePolicyList where totalLeave equals to UPDATED_TOTAL_LEAVE
        defaultLeavePolicyShouldNotBeFound("totalLeave.equals=" + UPDATED_TOTAL_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByTotalLeaveIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where totalLeave in DEFAULT_TOTAL_LEAVE or UPDATED_TOTAL_LEAVE
        defaultLeavePolicyShouldBeFound("totalLeave.in=" + DEFAULT_TOTAL_LEAVE + "," + UPDATED_TOTAL_LEAVE);

        // Get all the leavePolicyList where totalLeave equals to UPDATED_TOTAL_LEAVE
        defaultLeavePolicyShouldNotBeFound("totalLeave.in=" + UPDATED_TOTAL_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByTotalLeaveIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where totalLeave is not null
        defaultLeavePolicyShouldBeFound("totalLeave.specified=true");

        // Get all the leavePolicyList where totalLeave is null
        defaultLeavePolicyShouldNotBeFound("totalLeave.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByTotalLeaveContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where totalLeave contains DEFAULT_TOTAL_LEAVE
        defaultLeavePolicyShouldBeFound("totalLeave.contains=" + DEFAULT_TOTAL_LEAVE);

        // Get all the leavePolicyList where totalLeave contains UPDATED_TOTAL_LEAVE
        defaultLeavePolicyShouldNotBeFound("totalLeave.contains=" + UPDATED_TOTAL_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByTotalLeaveNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where totalLeave does not contain DEFAULT_TOTAL_LEAVE
        defaultLeavePolicyShouldNotBeFound("totalLeave.doesNotContain=" + DEFAULT_TOTAL_LEAVE);

        // Get all the leavePolicyList where totalLeave does not contain UPDATED_TOTAL_LEAVE
        defaultLeavePolicyShouldBeFound("totalLeave.doesNotContain=" + UPDATED_TOTAL_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByMaxLeaveIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where maxLeave equals to DEFAULT_MAX_LEAVE
        defaultLeavePolicyShouldBeFound("maxLeave.equals=" + DEFAULT_MAX_LEAVE);

        // Get all the leavePolicyList where maxLeave equals to UPDATED_MAX_LEAVE
        defaultLeavePolicyShouldNotBeFound("maxLeave.equals=" + UPDATED_MAX_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByMaxLeaveIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where maxLeave in DEFAULT_MAX_LEAVE or UPDATED_MAX_LEAVE
        defaultLeavePolicyShouldBeFound("maxLeave.in=" + DEFAULT_MAX_LEAVE + "," + UPDATED_MAX_LEAVE);

        // Get all the leavePolicyList where maxLeave equals to UPDATED_MAX_LEAVE
        defaultLeavePolicyShouldNotBeFound("maxLeave.in=" + UPDATED_MAX_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByMaxLeaveIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where maxLeave is not null
        defaultLeavePolicyShouldBeFound("maxLeave.specified=true");

        // Get all the leavePolicyList where maxLeave is null
        defaultLeavePolicyShouldNotBeFound("maxLeave.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByMaxLeaveContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where maxLeave contains DEFAULT_MAX_LEAVE
        defaultLeavePolicyShouldBeFound("maxLeave.contains=" + DEFAULT_MAX_LEAVE);

        // Get all the leavePolicyList where maxLeave contains UPDATED_MAX_LEAVE
        defaultLeavePolicyShouldNotBeFound("maxLeave.contains=" + UPDATED_MAX_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByMaxLeaveNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where maxLeave does not contain DEFAULT_MAX_LEAVE
        defaultLeavePolicyShouldNotBeFound("maxLeave.doesNotContain=" + DEFAULT_MAX_LEAVE);

        // Get all the leavePolicyList where maxLeave does not contain UPDATED_MAX_LEAVE
        defaultLeavePolicyShouldBeFound("maxLeave.doesNotContain=" + UPDATED_MAX_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByHasproRataLeaveIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where hasproRataLeave equals to DEFAULT_HASPRO_RATA_LEAVE
        defaultLeavePolicyShouldBeFound("hasproRataLeave.equals=" + DEFAULT_HASPRO_RATA_LEAVE);

        // Get all the leavePolicyList where hasproRataLeave equals to UPDATED_HASPRO_RATA_LEAVE
        defaultLeavePolicyShouldNotBeFound("hasproRataLeave.equals=" + UPDATED_HASPRO_RATA_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByHasproRataLeaveIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where hasproRataLeave in DEFAULT_HASPRO_RATA_LEAVE or UPDATED_HASPRO_RATA_LEAVE
        defaultLeavePolicyShouldBeFound("hasproRataLeave.in=" + DEFAULT_HASPRO_RATA_LEAVE + "," + UPDATED_HASPRO_RATA_LEAVE);

        // Get all the leavePolicyList where hasproRataLeave equals to UPDATED_HASPRO_RATA_LEAVE
        defaultLeavePolicyShouldNotBeFound("hasproRataLeave.in=" + UPDATED_HASPRO_RATA_LEAVE);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByHasproRataLeaveIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where hasproRataLeave is not null
        defaultLeavePolicyShouldBeFound("hasproRataLeave.specified=true");

        // Get all the leavePolicyList where hasproRataLeave is null
        defaultLeavePolicyShouldNotBeFound("hasproRataLeave.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where description equals to DEFAULT_DESCRIPTION
        defaultLeavePolicyShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the leavePolicyList where description equals to UPDATED_DESCRIPTION
        defaultLeavePolicyShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultLeavePolicyShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the leavePolicyList where description equals to UPDATED_DESCRIPTION
        defaultLeavePolicyShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where description is not null
        defaultLeavePolicyShouldBeFound("description.specified=true");

        // Get all the leavePolicyList where description is null
        defaultLeavePolicyShouldNotBeFound("description.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByDescriptionContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where description contains DEFAULT_DESCRIPTION
        defaultLeavePolicyShouldBeFound("description.contains=" + DEFAULT_DESCRIPTION);

        // Get all the leavePolicyList where description contains UPDATED_DESCRIPTION
        defaultLeavePolicyShouldNotBeFound("description.contains=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where description does not contain DEFAULT_DESCRIPTION
        defaultLeavePolicyShouldNotBeFound("description.doesNotContain=" + DEFAULT_DESCRIPTION);

        // Get all the leavePolicyList where description does not contain UPDATED_DESCRIPTION
        defaultLeavePolicyShouldBeFound("description.doesNotContain=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId equals to DEFAULT_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.equals=" + DEFAULT_COMPANY_ID);

        // Get all the leavePolicyList where companyId equals to UPDATED_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.equals=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId in DEFAULT_COMPANY_ID or UPDATED_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.in=" + DEFAULT_COMPANY_ID + "," + UPDATED_COMPANY_ID);

        // Get all the leavePolicyList where companyId equals to UPDATED_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.in=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId is not null
        defaultLeavePolicyShouldBeFound("companyId.specified=true");

        // Get all the leavePolicyList where companyId is null
        defaultLeavePolicyShouldNotBeFound("companyId.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId is greater than or equal to DEFAULT_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.greaterThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the leavePolicyList where companyId is greater than or equal to UPDATED_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.greaterThanOrEqual=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId is less than or equal to DEFAULT_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.lessThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the leavePolicyList where companyId is less than or equal to SMALLER_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.lessThanOrEqual=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsLessThanSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId is less than DEFAULT_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.lessThan=" + DEFAULT_COMPANY_ID);

        // Get all the leavePolicyList where companyId is less than UPDATED_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.lessThan=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByCompanyIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where companyId is greater than DEFAULT_COMPANY_ID
        defaultLeavePolicyShouldNotBeFound("companyId.greaterThan=" + DEFAULT_COMPANY_ID);

        // Get all the leavePolicyList where companyId is greater than SMALLER_COMPANY_ID
        defaultLeavePolicyShouldBeFound("companyId.greaterThan=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where status equals to DEFAULT_STATUS
        defaultLeavePolicyShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the leavePolicyList where status equals to UPDATED_STATUS
        defaultLeavePolicyShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultLeavePolicyShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the leavePolicyList where status equals to UPDATED_STATUS
        defaultLeavePolicyShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where status is not null
        defaultLeavePolicyShouldBeFound("status.specified=true");

        // Get all the leavePolicyList where status is null
        defaultLeavePolicyShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByStatusContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where status contains DEFAULT_STATUS
        defaultLeavePolicyShouldBeFound("status.contains=" + DEFAULT_STATUS);

        // Get all the leavePolicyList where status contains UPDATED_STATUS
        defaultLeavePolicyShouldNotBeFound("status.contains=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByStatusNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where status does not contain DEFAULT_STATUS
        defaultLeavePolicyShouldNotBeFound("status.doesNotContain=" + DEFAULT_STATUS);

        // Get all the leavePolicyList where status does not contain UPDATED_STATUS
        defaultLeavePolicyShouldBeFound("status.doesNotContain=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModified equals to DEFAULT_LAST_MODIFIED
        defaultLeavePolicyShouldBeFound("lastModified.equals=" + DEFAULT_LAST_MODIFIED);

        // Get all the leavePolicyList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultLeavePolicyShouldNotBeFound("lastModified.equals=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModified in DEFAULT_LAST_MODIFIED or UPDATED_LAST_MODIFIED
        defaultLeavePolicyShouldBeFound("lastModified.in=" + DEFAULT_LAST_MODIFIED + "," + UPDATED_LAST_MODIFIED);

        // Get all the leavePolicyList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultLeavePolicyShouldNotBeFound("lastModified.in=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModified is not null
        defaultLeavePolicyShouldBeFound("lastModified.specified=true");

        // Get all the leavePolicyList where lastModified is null
        defaultLeavePolicyShouldNotBeFound("lastModified.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedByIsEqualToSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModifiedBy equals to DEFAULT_LAST_MODIFIED_BY
        defaultLeavePolicyShouldBeFound("lastModifiedBy.equals=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the leavePolicyList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultLeavePolicyShouldNotBeFound("lastModifiedBy.equals=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedByIsInShouldWork() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModifiedBy in DEFAULT_LAST_MODIFIED_BY or UPDATED_LAST_MODIFIED_BY
        defaultLeavePolicyShouldBeFound("lastModifiedBy.in=" + DEFAULT_LAST_MODIFIED_BY + "," + UPDATED_LAST_MODIFIED_BY);

        // Get all the leavePolicyList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultLeavePolicyShouldNotBeFound("lastModifiedBy.in=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModifiedBy is not null
        defaultLeavePolicyShouldBeFound("lastModifiedBy.specified=true");

        // Get all the leavePolicyList where lastModifiedBy is null
        defaultLeavePolicyShouldNotBeFound("lastModifiedBy.specified=false");
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedByContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModifiedBy contains DEFAULT_LAST_MODIFIED_BY
        defaultLeavePolicyShouldBeFound("lastModifiedBy.contains=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the leavePolicyList where lastModifiedBy contains UPDATED_LAST_MODIFIED_BY
        defaultLeavePolicyShouldNotBeFound("lastModifiedBy.contains=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllLeavePoliciesByLastModifiedByNotContainsSomething() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        // Get all the leavePolicyList where lastModifiedBy does not contain DEFAULT_LAST_MODIFIED_BY
        defaultLeavePolicyShouldNotBeFound("lastModifiedBy.doesNotContain=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the leavePolicyList where lastModifiedBy does not contain UPDATED_LAST_MODIFIED_BY
        defaultLeavePolicyShouldBeFound("lastModifiedBy.doesNotContain=" + UPDATED_LAST_MODIFIED_BY);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultLeavePolicyShouldBeFound(String filter) throws Exception {
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leavePolicy.getId().intValue())))
            .andExpect(jsonPath("$.[*].leaveType").value(hasItem(DEFAULT_LEAVE_TYPE)))
            .andExpect(jsonPath("$.[*].isCarryForword").value(hasItem(DEFAULT_IS_CARRY_FORWORD.booleanValue())))
            .andExpect(jsonPath("$.[*].employeeType").value(hasItem(DEFAULT_EMPLOYEE_TYPE)))
            .andExpect(jsonPath("$.[*].genderLeave").value(hasItem(DEFAULT_GENDER_LEAVE)))
            .andExpect(jsonPath("$.[*].totalLeave").value(hasItem(DEFAULT_TOTAL_LEAVE)))
            .andExpect(jsonPath("$.[*].maxLeave").value(hasItem(DEFAULT_MAX_LEAVE)))
            .andExpect(jsonPath("$.[*].hasproRataLeave").value(hasItem(DEFAULT_HASPRO_RATA_LEAVE.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));

        // Check, that the count call also returns 1
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultLeavePolicyShouldNotBeFound(String filter) throws Exception {
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restLeavePolicyMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingLeavePolicy() throws Exception {
        // Get the leavePolicy
        restLeavePolicyMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLeavePolicy() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();

        // Update the leavePolicy
        LeavePolicy updatedLeavePolicy = leavePolicyRepository.findById(leavePolicy.getId()).get();
        // Disconnect from session so that the updates on updatedLeavePolicy are not directly saved in db
        em.detach(updatedLeavePolicy);
        updatedLeavePolicy
            .leaveType(UPDATED_LEAVE_TYPE)
            .isCarryForword(UPDATED_IS_CARRY_FORWORD)
            .employeeType(UPDATED_EMPLOYEE_TYPE)
            .genderLeave(UPDATED_GENDER_LEAVE)
            .totalLeave(UPDATED_TOTAL_LEAVE)
            .maxLeave(UPDATED_MAX_LEAVE)
            .hasproRataLeave(UPDATED_HASPRO_RATA_LEAVE)
            .description(UPDATED_DESCRIPTION)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(updatedLeavePolicy);

        restLeavePolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, leavePolicyDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isOk());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
        LeavePolicy testLeavePolicy = leavePolicyList.get(leavePolicyList.size() - 1);
        assertThat(testLeavePolicy.getLeaveType()).isEqualTo(UPDATED_LEAVE_TYPE);
        assertThat(testLeavePolicy.getIsCarryForword()).isEqualTo(UPDATED_IS_CARRY_FORWORD);
        assertThat(testLeavePolicy.getEmployeeType()).isEqualTo(UPDATED_EMPLOYEE_TYPE);
        assertThat(testLeavePolicy.getGenderLeave()).isEqualTo(UPDATED_GENDER_LEAVE);
        assertThat(testLeavePolicy.getTotalLeave()).isEqualTo(UPDATED_TOTAL_LEAVE);
        assertThat(testLeavePolicy.getMaxLeave()).isEqualTo(UPDATED_MAX_LEAVE);
        assertThat(testLeavePolicy.getHasproRataLeave()).isEqualTo(UPDATED_HASPRO_RATA_LEAVE);
        assertThat(testLeavePolicy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLeavePolicy.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testLeavePolicy.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testLeavePolicy.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testLeavePolicy.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void putNonExistingLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, leavePolicyDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLeavePolicyWithPatch() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();

        // Update the leavePolicy using partial update
        LeavePolicy partialUpdatedLeavePolicy = new LeavePolicy();
        partialUpdatedLeavePolicy.setId(leavePolicy.getId());

        partialUpdatedLeavePolicy
            .employeeType(UPDATED_EMPLOYEE_TYPE)
            .genderLeave(UPDATED_GENDER_LEAVE)
            .totalLeave(UPDATED_TOTAL_LEAVE)
            .maxLeave(UPDATED_MAX_LEAVE)
            .hasproRataLeave(UPDATED_HASPRO_RATA_LEAVE)
            .description(UPDATED_DESCRIPTION)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restLeavePolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLeavePolicy.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLeavePolicy))
            )
            .andExpect(status().isOk());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
        LeavePolicy testLeavePolicy = leavePolicyList.get(leavePolicyList.size() - 1);
        assertThat(testLeavePolicy.getLeaveType()).isEqualTo(DEFAULT_LEAVE_TYPE);
        assertThat(testLeavePolicy.getIsCarryForword()).isEqualTo(DEFAULT_IS_CARRY_FORWORD);
        assertThat(testLeavePolicy.getEmployeeType()).isEqualTo(UPDATED_EMPLOYEE_TYPE);
        assertThat(testLeavePolicy.getGenderLeave()).isEqualTo(UPDATED_GENDER_LEAVE);
        assertThat(testLeavePolicy.getTotalLeave()).isEqualTo(UPDATED_TOTAL_LEAVE);
        assertThat(testLeavePolicy.getMaxLeave()).isEqualTo(UPDATED_MAX_LEAVE);
        assertThat(testLeavePolicy.getHasproRataLeave()).isEqualTo(UPDATED_HASPRO_RATA_LEAVE);
        assertThat(testLeavePolicy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLeavePolicy.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testLeavePolicy.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testLeavePolicy.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testLeavePolicy.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void fullUpdateLeavePolicyWithPatch() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();

        // Update the leavePolicy using partial update
        LeavePolicy partialUpdatedLeavePolicy = new LeavePolicy();
        partialUpdatedLeavePolicy.setId(leavePolicy.getId());

        partialUpdatedLeavePolicy
            .leaveType(UPDATED_LEAVE_TYPE)
            .isCarryForword(UPDATED_IS_CARRY_FORWORD)
            .employeeType(UPDATED_EMPLOYEE_TYPE)
            .genderLeave(UPDATED_GENDER_LEAVE)
            .totalLeave(UPDATED_TOTAL_LEAVE)
            .maxLeave(UPDATED_MAX_LEAVE)
            .hasproRataLeave(UPDATED_HASPRO_RATA_LEAVE)
            .description(UPDATED_DESCRIPTION)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restLeavePolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLeavePolicy.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLeavePolicy))
            )
            .andExpect(status().isOk());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
        LeavePolicy testLeavePolicy = leavePolicyList.get(leavePolicyList.size() - 1);
        assertThat(testLeavePolicy.getLeaveType()).isEqualTo(UPDATED_LEAVE_TYPE);
        assertThat(testLeavePolicy.getIsCarryForword()).isEqualTo(UPDATED_IS_CARRY_FORWORD);
        assertThat(testLeavePolicy.getEmployeeType()).isEqualTo(UPDATED_EMPLOYEE_TYPE);
        assertThat(testLeavePolicy.getGenderLeave()).isEqualTo(UPDATED_GENDER_LEAVE);
        assertThat(testLeavePolicy.getTotalLeave()).isEqualTo(UPDATED_TOTAL_LEAVE);
        assertThat(testLeavePolicy.getMaxLeave()).isEqualTo(UPDATED_MAX_LEAVE);
        assertThat(testLeavePolicy.getHasproRataLeave()).isEqualTo(UPDATED_HASPRO_RATA_LEAVE);
        assertThat(testLeavePolicy.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLeavePolicy.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testLeavePolicy.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testLeavePolicy.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testLeavePolicy.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void patchNonExistingLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, leavePolicyDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLeavePolicy() throws Exception {
        int databaseSizeBeforeUpdate = leavePolicyRepository.findAll().size();
        leavePolicy.setId(count.incrementAndGet());

        // Create the LeavePolicy
        LeavePolicyDTO leavePolicyDTO = leavePolicyMapper.toDto(leavePolicy);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLeavePolicyMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(leavePolicyDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LeavePolicy in the database
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLeavePolicy() throws Exception {
        // Initialize the database
        leavePolicyRepository.saveAndFlush(leavePolicy);

        int databaseSizeBeforeDelete = leavePolicyRepository.findAll().size();

        // Delete the leavePolicy
        restLeavePolicyMockMvc
            .perform(delete(ENTITY_API_URL_ID, leavePolicy.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LeavePolicy> leavePolicyList = leavePolicyRepository.findAll();
        assertThat(leavePolicyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
