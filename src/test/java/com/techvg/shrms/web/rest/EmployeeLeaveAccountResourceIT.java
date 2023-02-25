package com.techvg.shrms.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.techvg.shrms.IntegrationTest;
import com.techvg.shrms.domain.EmployeeLeaveAccount;
import com.techvg.shrms.repository.EmployeeLeaveAccountRepository;
import com.techvg.shrms.service.criteria.EmployeeLeaveAccountCriteria;
import com.techvg.shrms.service.dto.EmployeeLeaveAccountDTO;
import com.techvg.shrms.service.mapper.EmployeeLeaveAccountMapper;
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
 * Integration tests for the {@link EmployeeLeaveAccountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EmployeeLeaveAccountResourceIT {

    private static final Long DEFAULT_LEAVE_TYPE_ID = 1L;
    private static final Long UPDATED_LEAVE_TYPE_ID = 2L;
    private static final Long SMALLER_LEAVE_TYPE_ID = 1L - 1L;

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;
    private static final Long SMALLER_EMPLOYEE_ID = 1L - 1L;

    private static final String DEFAULT_CARRIED_LEAVES = "AAAAAAAAAA";
    private static final String UPDATED_CARRIED_LEAVES = "BBBBBBBBBB";

    private static final String DEFAULT_CREDITED_LEAVES = "AAAAAAAAAA";
    private static final String UPDATED_CREDITED_LEAVES = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_BALANCE = "AAAAAAAAAA";
    private static final String UPDATED_BALANCE = "BBBBBBBBBB";

    private static final Long DEFAULT_COMPANY_ID = 1L;
    private static final Long UPDATED_COMPANY_ID = 2L;
    private static final Long SMALLER_COMPANY_ID = 1L - 1L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/employee-leave-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EmployeeLeaveAccountRepository employeeLeaveAccountRepository;

    @Autowired
    private EmployeeLeaveAccountMapper employeeLeaveAccountMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeLeaveAccountMockMvc;

    private EmployeeLeaveAccount employeeLeaveAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeLeaveAccount createEntity(EntityManager em) {
        EmployeeLeaveAccount employeeLeaveAccount = new EmployeeLeaveAccount()
            .leaveTypeId(DEFAULT_LEAVE_TYPE_ID)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .carriedLeaves(DEFAULT_CARRIED_LEAVES)
            .creditedLeaves(DEFAULT_CREDITED_LEAVES)
            .date(DEFAULT_DATE)
            .balance(DEFAULT_BALANCE)
            .companyId(DEFAULT_COMPANY_ID)
            .status(DEFAULT_STATUS)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return employeeLeaveAccount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeLeaveAccount createUpdatedEntity(EntityManager em) {
        EmployeeLeaveAccount employeeLeaveAccount = new EmployeeLeaveAccount()
            .leaveTypeId(UPDATED_LEAVE_TYPE_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .carriedLeaves(UPDATED_CARRIED_LEAVES)
            .creditedLeaves(UPDATED_CREDITED_LEAVES)
            .date(UPDATED_DATE)
            .balance(UPDATED_BALANCE)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return employeeLeaveAccount;
    }

    @BeforeEach
    public void initTest() {
        employeeLeaveAccount = createEntity(em);
    }

    @Test
    @Transactional
    void createEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeCreate = employeeLeaveAccountRepository.findAll().size();
        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);
        restEmployeeLeaveAccountMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeLeaveAccount testEmployeeLeaveAccount = employeeLeaveAccountList.get(employeeLeaveAccountList.size() - 1);
        assertThat(testEmployeeLeaveAccount.getLeaveTypeId()).isEqualTo(DEFAULT_LEAVE_TYPE_ID);
        assertThat(testEmployeeLeaveAccount.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testEmployeeLeaveAccount.getCarriedLeaves()).isEqualTo(DEFAULT_CARRIED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getCreditedLeaves()).isEqualTo(DEFAULT_CREDITED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testEmployeeLeaveAccount.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testEmployeeLeaveAccount.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testEmployeeLeaveAccount.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEmployeeLeaveAccount.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testEmployeeLeaveAccount.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void createEmployeeLeaveAccountWithExistingId() throws Exception {
        // Create the EmployeeLeaveAccount with an existing ID
        employeeLeaveAccount.setId(1L);
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        int databaseSizeBeforeCreate = employeeLeaveAccountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeLeaveAccountMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccounts() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeLeaveAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].leaveTypeId").value(hasItem(DEFAULT_LEAVE_TYPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].carriedLeaves").value(hasItem(DEFAULT_CARRIED_LEAVES)))
            .andExpect(jsonPath("$.[*].creditedLeaves").value(hasItem(DEFAULT_CREDITED_LEAVES)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }

    @Test
    @Transactional
    void getEmployeeLeaveAccount() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get the employeeLeaveAccount
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL_ID, employeeLeaveAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(employeeLeaveAccount.getId().intValue()))
            .andExpect(jsonPath("$.leaveTypeId").value(DEFAULT_LEAVE_TYPE_ID.intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.carriedLeaves").value(DEFAULT_CARRIED_LEAVES))
            .andExpect(jsonPath("$.creditedLeaves").value(DEFAULT_CREDITED_LEAVES))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.lastModified").value(DEFAULT_LAST_MODIFIED.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }

    @Test
    @Transactional
    void getEmployeeLeaveAccountsByIdFiltering() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        Long id = employeeLeaveAccount.getId();

        defaultEmployeeLeaveAccountShouldBeFound("id.equals=" + id);
        defaultEmployeeLeaveAccountShouldNotBeFound("id.notEquals=" + id);

        defaultEmployeeLeaveAccountShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultEmployeeLeaveAccountShouldNotBeFound("id.greaterThan=" + id);

        defaultEmployeeLeaveAccountShouldBeFound("id.lessThanOrEqual=" + id);
        defaultEmployeeLeaveAccountShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId equals to DEFAULT_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.equals=" + DEFAULT_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId equals to UPDATED_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.equals=" + UPDATED_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId in DEFAULT_LEAVE_TYPE_ID or UPDATED_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.in=" + DEFAULT_LEAVE_TYPE_ID + "," + UPDATED_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId equals to UPDATED_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.in=" + UPDATED_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId is not null
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.specified=true");

        // Get all the employeeLeaveAccountList where leaveTypeId is null
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId is greater than or equal to DEFAULT_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.greaterThanOrEqual=" + DEFAULT_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId is greater than or equal to UPDATED_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.greaterThanOrEqual=" + UPDATED_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId is less than or equal to DEFAULT_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.lessThanOrEqual=" + DEFAULT_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId is less than or equal to SMALLER_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.lessThanOrEqual=" + SMALLER_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId is less than DEFAULT_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.lessThan=" + DEFAULT_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId is less than UPDATED_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.lessThan=" + UPDATED_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLeaveTypeIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where leaveTypeId is greater than DEFAULT_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("leaveTypeId.greaterThan=" + DEFAULT_LEAVE_TYPE_ID);

        // Get all the employeeLeaveAccountList where leaveTypeId is greater than SMALLER_LEAVE_TYPE_ID
        defaultEmployeeLeaveAccountShouldBeFound("leaveTypeId.greaterThan=" + SMALLER_LEAVE_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId equals to DEFAULT_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.equals=" + DEFAULT_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId equals to UPDATED_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.equals=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId in DEFAULT_EMPLOYEE_ID or UPDATED_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.in=" + DEFAULT_EMPLOYEE_ID + "," + UPDATED_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId equals to UPDATED_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.in=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId is not null
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.specified=true");

        // Get all the employeeLeaveAccountList where employeeId is null
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId is greater than or equal to DEFAULT_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.greaterThanOrEqual=" + DEFAULT_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId is greater than or equal to UPDATED_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.greaterThanOrEqual=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId is less than or equal to DEFAULT_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.lessThanOrEqual=" + DEFAULT_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId is less than or equal to SMALLER_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.lessThanOrEqual=" + SMALLER_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId is less than DEFAULT_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.lessThan=" + DEFAULT_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId is less than UPDATED_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.lessThan=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByEmployeeIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where employeeId is greater than DEFAULT_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("employeeId.greaterThan=" + DEFAULT_EMPLOYEE_ID);

        // Get all the employeeLeaveAccountList where employeeId is greater than SMALLER_EMPLOYEE_ID
        defaultEmployeeLeaveAccountShouldBeFound("employeeId.greaterThan=" + SMALLER_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCarriedLeavesIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where carriedLeaves equals to DEFAULT_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("carriedLeaves.equals=" + DEFAULT_CARRIED_LEAVES);

        // Get all the employeeLeaveAccountList where carriedLeaves equals to UPDATED_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("carriedLeaves.equals=" + UPDATED_CARRIED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCarriedLeavesIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where carriedLeaves in DEFAULT_CARRIED_LEAVES or UPDATED_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("carriedLeaves.in=" + DEFAULT_CARRIED_LEAVES + "," + UPDATED_CARRIED_LEAVES);

        // Get all the employeeLeaveAccountList where carriedLeaves equals to UPDATED_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("carriedLeaves.in=" + UPDATED_CARRIED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCarriedLeavesIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where carriedLeaves is not null
        defaultEmployeeLeaveAccountShouldBeFound("carriedLeaves.specified=true");

        // Get all the employeeLeaveAccountList where carriedLeaves is null
        defaultEmployeeLeaveAccountShouldNotBeFound("carriedLeaves.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCarriedLeavesContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where carriedLeaves contains DEFAULT_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("carriedLeaves.contains=" + DEFAULT_CARRIED_LEAVES);

        // Get all the employeeLeaveAccountList where carriedLeaves contains UPDATED_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("carriedLeaves.contains=" + UPDATED_CARRIED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCarriedLeavesNotContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where carriedLeaves does not contain DEFAULT_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("carriedLeaves.doesNotContain=" + DEFAULT_CARRIED_LEAVES);

        // Get all the employeeLeaveAccountList where carriedLeaves does not contain UPDATED_CARRIED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("carriedLeaves.doesNotContain=" + UPDATED_CARRIED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCreditedLeavesIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where creditedLeaves equals to DEFAULT_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("creditedLeaves.equals=" + DEFAULT_CREDITED_LEAVES);

        // Get all the employeeLeaveAccountList where creditedLeaves equals to UPDATED_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("creditedLeaves.equals=" + UPDATED_CREDITED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCreditedLeavesIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where creditedLeaves in DEFAULT_CREDITED_LEAVES or UPDATED_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("creditedLeaves.in=" + DEFAULT_CREDITED_LEAVES + "," + UPDATED_CREDITED_LEAVES);

        // Get all the employeeLeaveAccountList where creditedLeaves equals to UPDATED_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("creditedLeaves.in=" + UPDATED_CREDITED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCreditedLeavesIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where creditedLeaves is not null
        defaultEmployeeLeaveAccountShouldBeFound("creditedLeaves.specified=true");

        // Get all the employeeLeaveAccountList where creditedLeaves is null
        defaultEmployeeLeaveAccountShouldNotBeFound("creditedLeaves.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCreditedLeavesContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where creditedLeaves contains DEFAULT_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("creditedLeaves.contains=" + DEFAULT_CREDITED_LEAVES);

        // Get all the employeeLeaveAccountList where creditedLeaves contains UPDATED_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("creditedLeaves.contains=" + UPDATED_CREDITED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCreditedLeavesNotContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where creditedLeaves does not contain DEFAULT_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldNotBeFound("creditedLeaves.doesNotContain=" + DEFAULT_CREDITED_LEAVES);

        // Get all the employeeLeaveAccountList where creditedLeaves does not contain UPDATED_CREDITED_LEAVES
        defaultEmployeeLeaveAccountShouldBeFound("creditedLeaves.doesNotContain=" + UPDATED_CREDITED_LEAVES);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByDateIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where date equals to DEFAULT_DATE
        defaultEmployeeLeaveAccountShouldBeFound("date.equals=" + DEFAULT_DATE);

        // Get all the employeeLeaveAccountList where date equals to UPDATED_DATE
        defaultEmployeeLeaveAccountShouldNotBeFound("date.equals=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByDateIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where date in DEFAULT_DATE or UPDATED_DATE
        defaultEmployeeLeaveAccountShouldBeFound("date.in=" + DEFAULT_DATE + "," + UPDATED_DATE);

        // Get all the employeeLeaveAccountList where date equals to UPDATED_DATE
        defaultEmployeeLeaveAccountShouldNotBeFound("date.in=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where date is not null
        defaultEmployeeLeaveAccountShouldBeFound("date.specified=true");

        // Get all the employeeLeaveAccountList where date is null
        defaultEmployeeLeaveAccountShouldNotBeFound("date.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByBalanceIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where balance equals to DEFAULT_BALANCE
        defaultEmployeeLeaveAccountShouldBeFound("balance.equals=" + DEFAULT_BALANCE);

        // Get all the employeeLeaveAccountList where balance equals to UPDATED_BALANCE
        defaultEmployeeLeaveAccountShouldNotBeFound("balance.equals=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByBalanceIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where balance in DEFAULT_BALANCE or UPDATED_BALANCE
        defaultEmployeeLeaveAccountShouldBeFound("balance.in=" + DEFAULT_BALANCE + "," + UPDATED_BALANCE);

        // Get all the employeeLeaveAccountList where balance equals to UPDATED_BALANCE
        defaultEmployeeLeaveAccountShouldNotBeFound("balance.in=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByBalanceIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where balance is not null
        defaultEmployeeLeaveAccountShouldBeFound("balance.specified=true");

        // Get all the employeeLeaveAccountList where balance is null
        defaultEmployeeLeaveAccountShouldNotBeFound("balance.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByBalanceContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where balance contains DEFAULT_BALANCE
        defaultEmployeeLeaveAccountShouldBeFound("balance.contains=" + DEFAULT_BALANCE);

        // Get all the employeeLeaveAccountList where balance contains UPDATED_BALANCE
        defaultEmployeeLeaveAccountShouldNotBeFound("balance.contains=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByBalanceNotContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where balance does not contain DEFAULT_BALANCE
        defaultEmployeeLeaveAccountShouldNotBeFound("balance.doesNotContain=" + DEFAULT_BALANCE);

        // Get all the employeeLeaveAccountList where balance does not contain UPDATED_BALANCE
        defaultEmployeeLeaveAccountShouldBeFound("balance.doesNotContain=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId equals to DEFAULT_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.equals=" + DEFAULT_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId equals to UPDATED_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.equals=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId in DEFAULT_COMPANY_ID or UPDATED_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.in=" + DEFAULT_COMPANY_ID + "," + UPDATED_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId equals to UPDATED_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.in=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId is not null
        defaultEmployeeLeaveAccountShouldBeFound("companyId.specified=true");

        // Get all the employeeLeaveAccountList where companyId is null
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId is greater than or equal to DEFAULT_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.greaterThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId is greater than or equal to UPDATED_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.greaterThanOrEqual=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId is less than or equal to DEFAULT_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.lessThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId is less than or equal to SMALLER_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.lessThanOrEqual=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId is less than DEFAULT_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.lessThan=" + DEFAULT_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId is less than UPDATED_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.lessThan=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByCompanyIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where companyId is greater than DEFAULT_COMPANY_ID
        defaultEmployeeLeaveAccountShouldNotBeFound("companyId.greaterThan=" + DEFAULT_COMPANY_ID);

        // Get all the employeeLeaveAccountList where companyId is greater than SMALLER_COMPANY_ID
        defaultEmployeeLeaveAccountShouldBeFound("companyId.greaterThan=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where status equals to DEFAULT_STATUS
        defaultEmployeeLeaveAccountShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the employeeLeaveAccountList where status equals to UPDATED_STATUS
        defaultEmployeeLeaveAccountShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultEmployeeLeaveAccountShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the employeeLeaveAccountList where status equals to UPDATED_STATUS
        defaultEmployeeLeaveAccountShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where status is not null
        defaultEmployeeLeaveAccountShouldBeFound("status.specified=true");

        // Get all the employeeLeaveAccountList where status is null
        defaultEmployeeLeaveAccountShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByStatusContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where status contains DEFAULT_STATUS
        defaultEmployeeLeaveAccountShouldBeFound("status.contains=" + DEFAULT_STATUS);

        // Get all the employeeLeaveAccountList where status contains UPDATED_STATUS
        defaultEmployeeLeaveAccountShouldNotBeFound("status.contains=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByStatusNotContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where status does not contain DEFAULT_STATUS
        defaultEmployeeLeaveAccountShouldNotBeFound("status.doesNotContain=" + DEFAULT_STATUS);

        // Get all the employeeLeaveAccountList where status does not contain UPDATED_STATUS
        defaultEmployeeLeaveAccountShouldBeFound("status.doesNotContain=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModified equals to DEFAULT_LAST_MODIFIED
        defaultEmployeeLeaveAccountShouldBeFound("lastModified.equals=" + DEFAULT_LAST_MODIFIED);

        // Get all the employeeLeaveAccountList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModified.equals=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModified in DEFAULT_LAST_MODIFIED or UPDATED_LAST_MODIFIED
        defaultEmployeeLeaveAccountShouldBeFound("lastModified.in=" + DEFAULT_LAST_MODIFIED + "," + UPDATED_LAST_MODIFIED);

        // Get all the employeeLeaveAccountList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModified.in=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModified is not null
        defaultEmployeeLeaveAccountShouldBeFound("lastModified.specified=true");

        // Get all the employeeLeaveAccountList where lastModified is null
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModified.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedByIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModifiedBy equals to DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldBeFound("lastModifiedBy.equals=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeLeaveAccountList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModifiedBy.equals=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedByIsInShouldWork() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModifiedBy in DEFAULT_LAST_MODIFIED_BY or UPDATED_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldBeFound("lastModifiedBy.in=" + DEFAULT_LAST_MODIFIED_BY + "," + UPDATED_LAST_MODIFIED_BY);

        // Get all the employeeLeaveAccountList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModifiedBy.in=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModifiedBy is not null
        defaultEmployeeLeaveAccountShouldBeFound("lastModifiedBy.specified=true");

        // Get all the employeeLeaveAccountList where lastModifiedBy is null
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModifiedBy.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedByContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModifiedBy contains DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldBeFound("lastModifiedBy.contains=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeLeaveAccountList where lastModifiedBy contains UPDATED_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModifiedBy.contains=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeeLeaveAccountsByLastModifiedByNotContainsSomething() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        // Get all the employeeLeaveAccountList where lastModifiedBy does not contain DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldNotBeFound("lastModifiedBy.doesNotContain=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeLeaveAccountList where lastModifiedBy does not contain UPDATED_LAST_MODIFIED_BY
        defaultEmployeeLeaveAccountShouldBeFound("lastModifiedBy.doesNotContain=" + UPDATED_LAST_MODIFIED_BY);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmployeeLeaveAccountShouldBeFound(String filter) throws Exception {
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeLeaveAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].leaveTypeId").value(hasItem(DEFAULT_LEAVE_TYPE_ID.intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].carriedLeaves").value(hasItem(DEFAULT_CARRIED_LEAVES)))
            .andExpect(jsonPath("$.[*].creditedLeaves").value(hasItem(DEFAULT_CREDITED_LEAVES)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));

        // Check, that the count call also returns 1
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmployeeLeaveAccountShouldNotBeFound(String filter) throws Exception {
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmployeeLeaveAccountMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEmployeeLeaveAccount() throws Exception {
        // Get the employeeLeaveAccount
        restEmployeeLeaveAccountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEmployeeLeaveAccount() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();

        // Update the employeeLeaveAccount
        EmployeeLeaveAccount updatedEmployeeLeaveAccount = employeeLeaveAccountRepository.findById(employeeLeaveAccount.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeLeaveAccount are not directly saved in db
        em.detach(updatedEmployeeLeaveAccount);
        updatedEmployeeLeaveAccount
            .leaveTypeId(UPDATED_LEAVE_TYPE_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .carriedLeaves(UPDATED_CARRIED_LEAVES)
            .creditedLeaves(UPDATED_CREDITED_LEAVES)
            .date(UPDATED_DATE)
            .balance(UPDATED_BALANCE)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(updatedEmployeeLeaveAccount);

        restEmployeeLeaveAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employeeLeaveAccountDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
        EmployeeLeaveAccount testEmployeeLeaveAccount = employeeLeaveAccountList.get(employeeLeaveAccountList.size() - 1);
        assertThat(testEmployeeLeaveAccount.getLeaveTypeId()).isEqualTo(UPDATED_LEAVE_TYPE_ID);
        assertThat(testEmployeeLeaveAccount.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testEmployeeLeaveAccount.getCarriedLeaves()).isEqualTo(UPDATED_CARRIED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getCreditedLeaves()).isEqualTo(UPDATED_CREDITED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testEmployeeLeaveAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testEmployeeLeaveAccount.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployeeLeaveAccount.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmployeeLeaveAccount.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testEmployeeLeaveAccount.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void putNonExistingEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employeeLeaveAccountDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmployeeLeaveAccountWithPatch() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();

        // Update the employeeLeaveAccount using partial update
        EmployeeLeaveAccount partialUpdatedEmployeeLeaveAccount = new EmployeeLeaveAccount();
        partialUpdatedEmployeeLeaveAccount.setId(employeeLeaveAccount.getId());

        partialUpdatedEmployeeLeaveAccount
            .carriedLeaves(UPDATED_CARRIED_LEAVES)
            .date(UPDATED_DATE)
            .balance(UPDATED_BALANCE)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restEmployeeLeaveAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployeeLeaveAccount.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeLeaveAccount))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
        EmployeeLeaveAccount testEmployeeLeaveAccount = employeeLeaveAccountList.get(employeeLeaveAccountList.size() - 1);
        assertThat(testEmployeeLeaveAccount.getLeaveTypeId()).isEqualTo(DEFAULT_LEAVE_TYPE_ID);
        assertThat(testEmployeeLeaveAccount.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testEmployeeLeaveAccount.getCarriedLeaves()).isEqualTo(UPDATED_CARRIED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getCreditedLeaves()).isEqualTo(DEFAULT_CREDITED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testEmployeeLeaveAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testEmployeeLeaveAccount.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployeeLeaveAccount.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmployeeLeaveAccount.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testEmployeeLeaveAccount.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void fullUpdateEmployeeLeaveAccountWithPatch() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();

        // Update the employeeLeaveAccount using partial update
        EmployeeLeaveAccount partialUpdatedEmployeeLeaveAccount = new EmployeeLeaveAccount();
        partialUpdatedEmployeeLeaveAccount.setId(employeeLeaveAccount.getId());

        partialUpdatedEmployeeLeaveAccount
            .leaveTypeId(UPDATED_LEAVE_TYPE_ID)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .carriedLeaves(UPDATED_CARRIED_LEAVES)
            .creditedLeaves(UPDATED_CREDITED_LEAVES)
            .date(UPDATED_DATE)
            .balance(UPDATED_BALANCE)
            .companyId(UPDATED_COMPANY_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restEmployeeLeaveAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployeeLeaveAccount.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeLeaveAccount))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
        EmployeeLeaveAccount testEmployeeLeaveAccount = employeeLeaveAccountList.get(employeeLeaveAccountList.size() - 1);
        assertThat(testEmployeeLeaveAccount.getLeaveTypeId()).isEqualTo(UPDATED_LEAVE_TYPE_ID);
        assertThat(testEmployeeLeaveAccount.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testEmployeeLeaveAccount.getCarriedLeaves()).isEqualTo(UPDATED_CARRIED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getCreditedLeaves()).isEqualTo(UPDATED_CREDITED_LEAVES);
        assertThat(testEmployeeLeaveAccount.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testEmployeeLeaveAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testEmployeeLeaveAccount.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployeeLeaveAccount.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmployeeLeaveAccount.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testEmployeeLeaveAccount.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void patchNonExistingEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, employeeLeaveAccountDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmployeeLeaveAccount() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveAccountRepository.findAll().size();
        employeeLeaveAccount.setId(count.incrementAndGet());

        // Create the EmployeeLeaveAccount
        EmployeeLeaveAccountDTO employeeLeaveAccountDTO = employeeLeaveAccountMapper.toDto(employeeLeaveAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeLeaveAccountMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeLeaveAccountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeLeaveAccount in the database
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmployeeLeaveAccount() throws Exception {
        // Initialize the database
        employeeLeaveAccountRepository.saveAndFlush(employeeLeaveAccount);

        int databaseSizeBeforeDelete = employeeLeaveAccountRepository.findAll().size();

        // Delete the employeeLeaveAccount
        restEmployeeLeaveAccountMockMvc
            .perform(delete(ENTITY_API_URL_ID, employeeLeaveAccount.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmployeeLeaveAccount> employeeLeaveAccountList = employeeLeaveAccountRepository.findAll();
        assertThat(employeeLeaveAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
