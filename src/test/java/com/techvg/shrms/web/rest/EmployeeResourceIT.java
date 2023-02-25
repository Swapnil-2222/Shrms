package com.techvg.shrms.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.techvg.shrms.IntegrationTest;
import com.techvg.shrms.domain.Employee;
import com.techvg.shrms.repository.EmployeeRepository;
import com.techvg.shrms.service.criteria.EmployeeCriteria;
import com.techvg.shrms.service.dto.EmployeeDTO;
import com.techvg.shrms.service.mapper.EmployeeMapper;
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
 * Integration tests for the {@link EmployeeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EmployeeResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTMENT = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final String DEFAULT_EMP_UNIQUE_ID = "AAAAAAAAAA";
    private static final String UPDATED_EMP_UNIQUE_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_JOINDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_JOINDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_COMPANY_ID = 1L;
    private static final Long UPDATED_COMPANY_ID = 2L;
    private static final Long SMALLER_COMPANY_ID = 1L - 1L;

    private static final Long DEFAULT_BRANCH_ID = 1L;
    private static final Long UPDATED_BRANCH_ID = 2L;
    private static final Long SMALLER_BRANCH_ID = 1L - 1L;

    private static final Long DEFAULT_REGION_ID = 1L;
    private static final Long UPDATED_REGION_ID = 2L;
    private static final Long SMALLER_REGION_ID = 1L - 1L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final Long DEFAULT_EMPLOYMENT_TYPE_ID = 1L;
    private static final Long UPDATED_EMPLOYMENT_TYPE_ID = 2L;
    private static final Long SMALLER_EMPLOYMENT_TYPE_ID = 1L - 1L;

    private static final String ENTITY_API_URL = "/api/employees";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeMockMvc;

    private Employee employee;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employee createEntity(EntityManager em) {
        Employee employee = new Employee()
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .department(DEFAULT_DEPARTMENT)
            .designation(DEFAULT_DESIGNATION)
            .gender(DEFAULT_GENDER)
            .empUniqueId(DEFAULT_EMP_UNIQUE_ID)
            .joindate(DEFAULT_JOINDATE)
            .companyId(DEFAULT_COMPANY_ID)
            .branchId(DEFAULT_BRANCH_ID)
            .regionId(DEFAULT_REGION_ID)
            .status(DEFAULT_STATUS)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .employmentTypeId(DEFAULT_EMPLOYMENT_TYPE_ID);
        return employee;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employee createUpdatedEntity(EntityManager em) {
        Employee employee = new Employee()
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .department(UPDATED_DEPARTMENT)
            .designation(UPDATED_DESIGNATION)
            .gender(UPDATED_GENDER)
            .empUniqueId(UPDATED_EMP_UNIQUE_ID)
            .joindate(UPDATED_JOINDATE)
            .companyId(UPDATED_COMPANY_ID)
            .branchId(UPDATED_BRANCH_ID)
            .regionId(UPDATED_REGION_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .employmentTypeId(UPDATED_EMPLOYMENT_TYPE_ID);
        return employee;
    }

    @BeforeEach
    public void initTest() {
        employee = createEntity(em);
    }

    @Test
    @Transactional
    void createEmployee() throws Exception {
        int databaseSizeBeforeCreate = employeeRepository.findAll().size();
        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);
        restEmployeeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeCreate + 1);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testEmployee.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testEmployee.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testEmployee.getDepartment()).isEqualTo(DEFAULT_DEPARTMENT);
        assertThat(testEmployee.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testEmployee.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testEmployee.getEmpUniqueId()).isEqualTo(DEFAULT_EMP_UNIQUE_ID);
        assertThat(testEmployee.getJoindate()).isEqualTo(DEFAULT_JOINDATE);
        assertThat(testEmployee.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testEmployee.getBranchId()).isEqualTo(DEFAULT_BRANCH_ID);
        assertThat(testEmployee.getRegionId()).isEqualTo(DEFAULT_REGION_ID);
        assertThat(testEmployee.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEmployee.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testEmployee.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testEmployee.getEmploymentTypeId()).isEqualTo(DEFAULT_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void createEmployeeWithExistingId() throws Exception {
        // Create the Employee with an existing ID
        employee.setId(1L);
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        int databaseSizeBeforeCreate = employeeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkEmpUniqueIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeRepository.findAll().size();
        // set the field null
        employee.setEmpUniqueId(null);

        // Create the Employee, which fails.
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        restEmployeeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEmployees() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employee.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].department").value(hasItem(DEFAULT_DEPARTMENT)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)))
            .andExpect(jsonPath("$.[*].empUniqueId").value(hasItem(DEFAULT_EMP_UNIQUE_ID)))
            .andExpect(jsonPath("$.[*].joindate").value(hasItem(DEFAULT_JOINDATE.toString())))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].branchId").value(hasItem(DEFAULT_BRANCH_ID.intValue())))
            .andExpect(jsonPath("$.[*].regionId").value(hasItem(DEFAULT_REGION_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].employmentTypeId").value(hasItem(DEFAULT_EMPLOYMENT_TYPE_ID.intValue())));
    }

    @Test
    @Transactional
    void getEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get the employee
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL_ID, employee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(employee.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.department").value(DEFAULT_DEPARTMENT))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER))
            .andExpect(jsonPath("$.empUniqueId").value(DEFAULT_EMP_UNIQUE_ID))
            .andExpect(jsonPath("$.joindate").value(DEFAULT_JOINDATE.toString()))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID.intValue()))
            .andExpect(jsonPath("$.branchId").value(DEFAULT_BRANCH_ID.intValue()))
            .andExpect(jsonPath("$.regionId").value(DEFAULT_REGION_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.lastModified").value(DEFAULT_LAST_MODIFIED.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY))
            .andExpect(jsonPath("$.employmentTypeId").value(DEFAULT_EMPLOYMENT_TYPE_ID.intValue()));
    }

    @Test
    @Transactional
    void getEmployeesByIdFiltering() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        Long id = employee.getId();

        defaultEmployeeShouldBeFound("id.equals=" + id);
        defaultEmployeeShouldNotBeFound("id.notEquals=" + id);

        defaultEmployeeShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultEmployeeShouldNotBeFound("id.greaterThan=" + id);

        defaultEmployeeShouldBeFound("id.lessThanOrEqual=" + id);
        defaultEmployeeShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllEmployeesByFirstNameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where firstName equals to DEFAULT_FIRST_NAME
        defaultEmployeeShouldBeFound("firstName.equals=" + DEFAULT_FIRST_NAME);

        // Get all the employeeList where firstName equals to UPDATED_FIRST_NAME
        defaultEmployeeShouldNotBeFound("firstName.equals=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFirstNameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where firstName in DEFAULT_FIRST_NAME or UPDATED_FIRST_NAME
        defaultEmployeeShouldBeFound("firstName.in=" + DEFAULT_FIRST_NAME + "," + UPDATED_FIRST_NAME);

        // Get all the employeeList where firstName equals to UPDATED_FIRST_NAME
        defaultEmployeeShouldNotBeFound("firstName.in=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFirstNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where firstName is not null
        defaultEmployeeShouldBeFound("firstName.specified=true");

        // Get all the employeeList where firstName is null
        defaultEmployeeShouldNotBeFound("firstName.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByFirstNameContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where firstName contains DEFAULT_FIRST_NAME
        defaultEmployeeShouldBeFound("firstName.contains=" + DEFAULT_FIRST_NAME);

        // Get all the employeeList where firstName contains UPDATED_FIRST_NAME
        defaultEmployeeShouldNotBeFound("firstName.contains=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFirstNameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where firstName does not contain DEFAULT_FIRST_NAME
        defaultEmployeeShouldNotBeFound("firstName.doesNotContain=" + DEFAULT_FIRST_NAME);

        // Get all the employeeList where firstName does not contain UPDATED_FIRST_NAME
        defaultEmployeeShouldBeFound("firstName.doesNotContain=" + UPDATED_FIRST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByMiddleNameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where middleName equals to DEFAULT_MIDDLE_NAME
        defaultEmployeeShouldBeFound("middleName.equals=" + DEFAULT_MIDDLE_NAME);

        // Get all the employeeList where middleName equals to UPDATED_MIDDLE_NAME
        defaultEmployeeShouldNotBeFound("middleName.equals=" + UPDATED_MIDDLE_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByMiddleNameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where middleName in DEFAULT_MIDDLE_NAME or UPDATED_MIDDLE_NAME
        defaultEmployeeShouldBeFound("middleName.in=" + DEFAULT_MIDDLE_NAME + "," + UPDATED_MIDDLE_NAME);

        // Get all the employeeList where middleName equals to UPDATED_MIDDLE_NAME
        defaultEmployeeShouldNotBeFound("middleName.in=" + UPDATED_MIDDLE_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByMiddleNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where middleName is not null
        defaultEmployeeShouldBeFound("middleName.specified=true");

        // Get all the employeeList where middleName is null
        defaultEmployeeShouldNotBeFound("middleName.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByMiddleNameContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where middleName contains DEFAULT_MIDDLE_NAME
        defaultEmployeeShouldBeFound("middleName.contains=" + DEFAULT_MIDDLE_NAME);

        // Get all the employeeList where middleName contains UPDATED_MIDDLE_NAME
        defaultEmployeeShouldNotBeFound("middleName.contains=" + UPDATED_MIDDLE_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByMiddleNameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where middleName does not contain DEFAULT_MIDDLE_NAME
        defaultEmployeeShouldNotBeFound("middleName.doesNotContain=" + DEFAULT_MIDDLE_NAME);

        // Get all the employeeList where middleName does not contain UPDATED_MIDDLE_NAME
        defaultEmployeeShouldBeFound("middleName.doesNotContain=" + UPDATED_MIDDLE_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastNameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastName equals to DEFAULT_LAST_NAME
        defaultEmployeeShouldBeFound("lastName.equals=" + DEFAULT_LAST_NAME);

        // Get all the employeeList where lastName equals to UPDATED_LAST_NAME
        defaultEmployeeShouldNotBeFound("lastName.equals=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastNameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastName in DEFAULT_LAST_NAME or UPDATED_LAST_NAME
        defaultEmployeeShouldBeFound("lastName.in=" + DEFAULT_LAST_NAME + "," + UPDATED_LAST_NAME);

        // Get all the employeeList where lastName equals to UPDATED_LAST_NAME
        defaultEmployeeShouldNotBeFound("lastName.in=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastName is not null
        defaultEmployeeShouldBeFound("lastName.specified=true");

        // Get all the employeeList where lastName is null
        defaultEmployeeShouldNotBeFound("lastName.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByLastNameContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastName contains DEFAULT_LAST_NAME
        defaultEmployeeShouldBeFound("lastName.contains=" + DEFAULT_LAST_NAME);

        // Get all the employeeList where lastName contains UPDATED_LAST_NAME
        defaultEmployeeShouldNotBeFound("lastName.contains=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastNameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastName does not contain DEFAULT_LAST_NAME
        defaultEmployeeShouldNotBeFound("lastName.doesNotContain=" + DEFAULT_LAST_NAME);

        // Get all the employeeList where lastName does not contain UPDATED_LAST_NAME
        defaultEmployeeShouldBeFound("lastName.doesNotContain=" + UPDATED_LAST_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByDepartmentIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where department equals to DEFAULT_DEPARTMENT
        defaultEmployeeShouldBeFound("department.equals=" + DEFAULT_DEPARTMENT);

        // Get all the employeeList where department equals to UPDATED_DEPARTMENT
        defaultEmployeeShouldNotBeFound("department.equals=" + UPDATED_DEPARTMENT);
    }

    @Test
    @Transactional
    void getAllEmployeesByDepartmentIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where department in DEFAULT_DEPARTMENT or UPDATED_DEPARTMENT
        defaultEmployeeShouldBeFound("department.in=" + DEFAULT_DEPARTMENT + "," + UPDATED_DEPARTMENT);

        // Get all the employeeList where department equals to UPDATED_DEPARTMENT
        defaultEmployeeShouldNotBeFound("department.in=" + UPDATED_DEPARTMENT);
    }

    @Test
    @Transactional
    void getAllEmployeesByDepartmentIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where department is not null
        defaultEmployeeShouldBeFound("department.specified=true");

        // Get all the employeeList where department is null
        defaultEmployeeShouldNotBeFound("department.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByDepartmentContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where department contains DEFAULT_DEPARTMENT
        defaultEmployeeShouldBeFound("department.contains=" + DEFAULT_DEPARTMENT);

        // Get all the employeeList where department contains UPDATED_DEPARTMENT
        defaultEmployeeShouldNotBeFound("department.contains=" + UPDATED_DEPARTMENT);
    }

    @Test
    @Transactional
    void getAllEmployeesByDepartmentNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where department does not contain DEFAULT_DEPARTMENT
        defaultEmployeeShouldNotBeFound("department.doesNotContain=" + DEFAULT_DEPARTMENT);

        // Get all the employeeList where department does not contain UPDATED_DEPARTMENT
        defaultEmployeeShouldBeFound("department.doesNotContain=" + UPDATED_DEPARTMENT);
    }

    @Test
    @Transactional
    void getAllEmployeesByDesignationIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where designation equals to DEFAULT_DESIGNATION
        defaultEmployeeShouldBeFound("designation.equals=" + DEFAULT_DESIGNATION);

        // Get all the employeeList where designation equals to UPDATED_DESIGNATION
        defaultEmployeeShouldNotBeFound("designation.equals=" + UPDATED_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllEmployeesByDesignationIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where designation in DEFAULT_DESIGNATION or UPDATED_DESIGNATION
        defaultEmployeeShouldBeFound("designation.in=" + DEFAULT_DESIGNATION + "," + UPDATED_DESIGNATION);

        // Get all the employeeList where designation equals to UPDATED_DESIGNATION
        defaultEmployeeShouldNotBeFound("designation.in=" + UPDATED_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllEmployeesByDesignationIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where designation is not null
        defaultEmployeeShouldBeFound("designation.specified=true");

        // Get all the employeeList where designation is null
        defaultEmployeeShouldNotBeFound("designation.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByDesignationContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where designation contains DEFAULT_DESIGNATION
        defaultEmployeeShouldBeFound("designation.contains=" + DEFAULT_DESIGNATION);

        // Get all the employeeList where designation contains UPDATED_DESIGNATION
        defaultEmployeeShouldNotBeFound("designation.contains=" + UPDATED_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllEmployeesByDesignationNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where designation does not contain DEFAULT_DESIGNATION
        defaultEmployeeShouldNotBeFound("designation.doesNotContain=" + DEFAULT_DESIGNATION);

        // Get all the employeeList where designation does not contain UPDATED_DESIGNATION
        defaultEmployeeShouldBeFound("designation.doesNotContain=" + UPDATED_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllEmployeesByGenderIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where gender equals to DEFAULT_GENDER
        defaultEmployeeShouldBeFound("gender.equals=" + DEFAULT_GENDER);

        // Get all the employeeList where gender equals to UPDATED_GENDER
        defaultEmployeeShouldNotBeFound("gender.equals=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    void getAllEmployeesByGenderIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where gender in DEFAULT_GENDER or UPDATED_GENDER
        defaultEmployeeShouldBeFound("gender.in=" + DEFAULT_GENDER + "," + UPDATED_GENDER);

        // Get all the employeeList where gender equals to UPDATED_GENDER
        defaultEmployeeShouldNotBeFound("gender.in=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    void getAllEmployeesByGenderIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where gender is not null
        defaultEmployeeShouldBeFound("gender.specified=true");

        // Get all the employeeList where gender is null
        defaultEmployeeShouldNotBeFound("gender.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByGenderContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where gender contains DEFAULT_GENDER
        defaultEmployeeShouldBeFound("gender.contains=" + DEFAULT_GENDER);

        // Get all the employeeList where gender contains UPDATED_GENDER
        defaultEmployeeShouldNotBeFound("gender.contains=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    void getAllEmployeesByGenderNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where gender does not contain DEFAULT_GENDER
        defaultEmployeeShouldNotBeFound("gender.doesNotContain=" + DEFAULT_GENDER);

        // Get all the employeeList where gender does not contain UPDATED_GENDER
        defaultEmployeeShouldBeFound("gender.doesNotContain=" + UPDATED_GENDER);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmpUniqueIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where empUniqueId equals to DEFAULT_EMP_UNIQUE_ID
        defaultEmployeeShouldBeFound("empUniqueId.equals=" + DEFAULT_EMP_UNIQUE_ID);

        // Get all the employeeList where empUniqueId equals to UPDATED_EMP_UNIQUE_ID
        defaultEmployeeShouldNotBeFound("empUniqueId.equals=" + UPDATED_EMP_UNIQUE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmpUniqueIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where empUniqueId in DEFAULT_EMP_UNIQUE_ID or UPDATED_EMP_UNIQUE_ID
        defaultEmployeeShouldBeFound("empUniqueId.in=" + DEFAULT_EMP_UNIQUE_ID + "," + UPDATED_EMP_UNIQUE_ID);

        // Get all the employeeList where empUniqueId equals to UPDATED_EMP_UNIQUE_ID
        defaultEmployeeShouldNotBeFound("empUniqueId.in=" + UPDATED_EMP_UNIQUE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmpUniqueIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where empUniqueId is not null
        defaultEmployeeShouldBeFound("empUniqueId.specified=true");

        // Get all the employeeList where empUniqueId is null
        defaultEmployeeShouldNotBeFound("empUniqueId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByEmpUniqueIdContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where empUniqueId contains DEFAULT_EMP_UNIQUE_ID
        defaultEmployeeShouldBeFound("empUniqueId.contains=" + DEFAULT_EMP_UNIQUE_ID);

        // Get all the employeeList where empUniqueId contains UPDATED_EMP_UNIQUE_ID
        defaultEmployeeShouldNotBeFound("empUniqueId.contains=" + UPDATED_EMP_UNIQUE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmpUniqueIdNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where empUniqueId does not contain DEFAULT_EMP_UNIQUE_ID
        defaultEmployeeShouldNotBeFound("empUniqueId.doesNotContain=" + DEFAULT_EMP_UNIQUE_ID);

        // Get all the employeeList where empUniqueId does not contain UPDATED_EMP_UNIQUE_ID
        defaultEmployeeShouldBeFound("empUniqueId.doesNotContain=" + UPDATED_EMP_UNIQUE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByJoindateIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where joindate equals to DEFAULT_JOINDATE
        defaultEmployeeShouldBeFound("joindate.equals=" + DEFAULT_JOINDATE);

        // Get all the employeeList where joindate equals to UPDATED_JOINDATE
        defaultEmployeeShouldNotBeFound("joindate.equals=" + UPDATED_JOINDATE);
    }

    @Test
    @Transactional
    void getAllEmployeesByJoindateIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where joindate in DEFAULT_JOINDATE or UPDATED_JOINDATE
        defaultEmployeeShouldBeFound("joindate.in=" + DEFAULT_JOINDATE + "," + UPDATED_JOINDATE);

        // Get all the employeeList where joindate equals to UPDATED_JOINDATE
        defaultEmployeeShouldNotBeFound("joindate.in=" + UPDATED_JOINDATE);
    }

    @Test
    @Transactional
    void getAllEmployeesByJoindateIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where joindate is not null
        defaultEmployeeShouldBeFound("joindate.specified=true");

        // Get all the employeeList where joindate is null
        defaultEmployeeShouldNotBeFound("joindate.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId equals to DEFAULT_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.equals=" + DEFAULT_COMPANY_ID);

        // Get all the employeeList where companyId equals to UPDATED_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.equals=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId in DEFAULT_COMPANY_ID or UPDATED_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.in=" + DEFAULT_COMPANY_ID + "," + UPDATED_COMPANY_ID);

        // Get all the employeeList where companyId equals to UPDATED_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.in=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId is not null
        defaultEmployeeShouldBeFound("companyId.specified=true");

        // Get all the employeeList where companyId is null
        defaultEmployeeShouldNotBeFound("companyId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId is greater than or equal to DEFAULT_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.greaterThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the employeeList where companyId is greater than or equal to UPDATED_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.greaterThanOrEqual=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId is less than or equal to DEFAULT_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.lessThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the employeeList where companyId is less than or equal to SMALLER_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.lessThanOrEqual=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId is less than DEFAULT_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.lessThan=" + DEFAULT_COMPANY_ID);

        // Get all the employeeList where companyId is less than UPDATED_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.lessThan=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByCompanyIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where companyId is greater than DEFAULT_COMPANY_ID
        defaultEmployeeShouldNotBeFound("companyId.greaterThan=" + DEFAULT_COMPANY_ID);

        // Get all the employeeList where companyId is greater than SMALLER_COMPANY_ID
        defaultEmployeeShouldBeFound("companyId.greaterThan=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId equals to DEFAULT_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.equals=" + DEFAULT_BRANCH_ID);

        // Get all the employeeList where branchId equals to UPDATED_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.equals=" + UPDATED_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId in DEFAULT_BRANCH_ID or UPDATED_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.in=" + DEFAULT_BRANCH_ID + "," + UPDATED_BRANCH_ID);

        // Get all the employeeList where branchId equals to UPDATED_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.in=" + UPDATED_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId is not null
        defaultEmployeeShouldBeFound("branchId.specified=true");

        // Get all the employeeList where branchId is null
        defaultEmployeeShouldNotBeFound("branchId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId is greater than or equal to DEFAULT_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.greaterThanOrEqual=" + DEFAULT_BRANCH_ID);

        // Get all the employeeList where branchId is greater than or equal to UPDATED_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.greaterThanOrEqual=" + UPDATED_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId is less than or equal to DEFAULT_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.lessThanOrEqual=" + DEFAULT_BRANCH_ID);

        // Get all the employeeList where branchId is less than or equal to SMALLER_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.lessThanOrEqual=" + SMALLER_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId is less than DEFAULT_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.lessThan=" + DEFAULT_BRANCH_ID);

        // Get all the employeeList where branchId is less than UPDATED_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.lessThan=" + UPDATED_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByBranchIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where branchId is greater than DEFAULT_BRANCH_ID
        defaultEmployeeShouldNotBeFound("branchId.greaterThan=" + DEFAULT_BRANCH_ID);

        // Get all the employeeList where branchId is greater than SMALLER_BRANCH_ID
        defaultEmployeeShouldBeFound("branchId.greaterThan=" + SMALLER_BRANCH_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId equals to DEFAULT_REGION_ID
        defaultEmployeeShouldBeFound("regionId.equals=" + DEFAULT_REGION_ID);

        // Get all the employeeList where regionId equals to UPDATED_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.equals=" + UPDATED_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId in DEFAULT_REGION_ID or UPDATED_REGION_ID
        defaultEmployeeShouldBeFound("regionId.in=" + DEFAULT_REGION_ID + "," + UPDATED_REGION_ID);

        // Get all the employeeList where regionId equals to UPDATED_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.in=" + UPDATED_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId is not null
        defaultEmployeeShouldBeFound("regionId.specified=true");

        // Get all the employeeList where regionId is null
        defaultEmployeeShouldNotBeFound("regionId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId is greater than or equal to DEFAULT_REGION_ID
        defaultEmployeeShouldBeFound("regionId.greaterThanOrEqual=" + DEFAULT_REGION_ID);

        // Get all the employeeList where regionId is greater than or equal to UPDATED_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.greaterThanOrEqual=" + UPDATED_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId is less than or equal to DEFAULT_REGION_ID
        defaultEmployeeShouldBeFound("regionId.lessThanOrEqual=" + DEFAULT_REGION_ID);

        // Get all the employeeList where regionId is less than or equal to SMALLER_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.lessThanOrEqual=" + SMALLER_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId is less than DEFAULT_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.lessThan=" + DEFAULT_REGION_ID);

        // Get all the employeeList where regionId is less than UPDATED_REGION_ID
        defaultEmployeeShouldBeFound("regionId.lessThan=" + UPDATED_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByRegionIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where regionId is greater than DEFAULT_REGION_ID
        defaultEmployeeShouldNotBeFound("regionId.greaterThan=" + DEFAULT_REGION_ID);

        // Get all the employeeList where regionId is greater than SMALLER_REGION_ID
        defaultEmployeeShouldBeFound("regionId.greaterThan=" + SMALLER_REGION_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where status equals to DEFAULT_STATUS
        defaultEmployeeShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the employeeList where status equals to UPDATED_STATUS
        defaultEmployeeShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeesByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultEmployeeShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the employeeList where status equals to UPDATED_STATUS
        defaultEmployeeShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeesByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where status is not null
        defaultEmployeeShouldBeFound("status.specified=true");

        // Get all the employeeList where status is null
        defaultEmployeeShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByStatusContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where status contains DEFAULT_STATUS
        defaultEmployeeShouldBeFound("status.contains=" + DEFAULT_STATUS);

        // Get all the employeeList where status contains UPDATED_STATUS
        defaultEmployeeShouldNotBeFound("status.contains=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeesByStatusNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where status does not contain DEFAULT_STATUS
        defaultEmployeeShouldNotBeFound("status.doesNotContain=" + DEFAULT_STATUS);

        // Get all the employeeList where status does not contain UPDATED_STATUS
        defaultEmployeeShouldBeFound("status.doesNotContain=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModified equals to DEFAULT_LAST_MODIFIED
        defaultEmployeeShouldBeFound("lastModified.equals=" + DEFAULT_LAST_MODIFIED);

        // Get all the employeeList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultEmployeeShouldNotBeFound("lastModified.equals=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModified in DEFAULT_LAST_MODIFIED or UPDATED_LAST_MODIFIED
        defaultEmployeeShouldBeFound("lastModified.in=" + DEFAULT_LAST_MODIFIED + "," + UPDATED_LAST_MODIFIED);

        // Get all the employeeList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultEmployeeShouldNotBeFound("lastModified.in=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModified is not null
        defaultEmployeeShouldBeFound("lastModified.specified=true");

        // Get all the employeeList where lastModified is null
        defaultEmployeeShouldNotBeFound("lastModified.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedByIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModifiedBy equals to DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeShouldBeFound("lastModifiedBy.equals=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultEmployeeShouldNotBeFound("lastModifiedBy.equals=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedByIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModifiedBy in DEFAULT_LAST_MODIFIED_BY or UPDATED_LAST_MODIFIED_BY
        defaultEmployeeShouldBeFound("lastModifiedBy.in=" + DEFAULT_LAST_MODIFIED_BY + "," + UPDATED_LAST_MODIFIED_BY);

        // Get all the employeeList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultEmployeeShouldNotBeFound("lastModifiedBy.in=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModifiedBy is not null
        defaultEmployeeShouldBeFound("lastModifiedBy.specified=true");

        // Get all the employeeList where lastModifiedBy is null
        defaultEmployeeShouldNotBeFound("lastModifiedBy.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedByContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModifiedBy contains DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeShouldBeFound("lastModifiedBy.contains=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeList where lastModifiedBy contains UPDATED_LAST_MODIFIED_BY
        defaultEmployeeShouldNotBeFound("lastModifiedBy.contains=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeesByLastModifiedByNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where lastModifiedBy does not contain DEFAULT_LAST_MODIFIED_BY
        defaultEmployeeShouldNotBeFound("lastModifiedBy.doesNotContain=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the employeeList where lastModifiedBy does not contain UPDATED_LAST_MODIFIED_BY
        defaultEmployeeShouldBeFound("lastModifiedBy.doesNotContain=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId equals to DEFAULT_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.equals=" + DEFAULT_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId equals to UPDATED_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.equals=" + UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId in DEFAULT_EMPLOYMENT_TYPE_ID or UPDATED_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.in=" + DEFAULT_EMPLOYMENT_TYPE_ID + "," + UPDATED_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId equals to UPDATED_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.in=" + UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId is not null
        defaultEmployeeShouldBeFound("employmentTypeId.specified=true");

        // Get all the employeeList where employmentTypeId is null
        defaultEmployeeShouldNotBeFound("employmentTypeId.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId is greater than or equal to DEFAULT_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.greaterThanOrEqual=" + DEFAULT_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId is greater than or equal to UPDATED_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.greaterThanOrEqual=" + UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId is less than or equal to DEFAULT_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.lessThanOrEqual=" + DEFAULT_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId is less than or equal to SMALLER_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.lessThanOrEqual=" + SMALLER_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId is less than DEFAULT_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.lessThan=" + DEFAULT_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId is less than UPDATED_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.lessThan=" + UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void getAllEmployeesByEmploymentTypeIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where employmentTypeId is greater than DEFAULT_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldNotBeFound("employmentTypeId.greaterThan=" + DEFAULT_EMPLOYMENT_TYPE_ID);

        // Get all the employeeList where employmentTypeId is greater than SMALLER_EMPLOYMENT_TYPE_ID
        defaultEmployeeShouldBeFound("employmentTypeId.greaterThan=" + SMALLER_EMPLOYMENT_TYPE_ID);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmployeeShouldBeFound(String filter) throws Exception {
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employee.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].department").value(hasItem(DEFAULT_DEPARTMENT)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)))
            .andExpect(jsonPath("$.[*].empUniqueId").value(hasItem(DEFAULT_EMP_UNIQUE_ID)))
            .andExpect(jsonPath("$.[*].joindate").value(hasItem(DEFAULT_JOINDATE.toString())))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].branchId").value(hasItem(DEFAULT_BRANCH_ID.intValue())))
            .andExpect(jsonPath("$.[*].regionId").value(hasItem(DEFAULT_REGION_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)))
            .andExpect(jsonPath("$.[*].employmentTypeId").value(hasItem(DEFAULT_EMPLOYMENT_TYPE_ID.intValue())));

        // Check, that the count call also returns 1
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmployeeShouldNotBeFound(String filter) throws Exception {
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEmployee() throws Exception {
        // Get the employee
        restEmployeeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee
        Employee updatedEmployee = employeeRepository.findById(employee.getId()).get();
        // Disconnect from session so that the updates on updatedEmployee are not directly saved in db
        em.detach(updatedEmployee);
        updatedEmployee
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .department(UPDATED_DEPARTMENT)
            .designation(UPDATED_DESIGNATION)
            .gender(UPDATED_GENDER)
            .empUniqueId(UPDATED_EMP_UNIQUE_ID)
            .joindate(UPDATED_JOINDATE)
            .companyId(UPDATED_COMPANY_ID)
            .branchId(UPDATED_BRANCH_ID)
            .regionId(UPDATED_REGION_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .employmentTypeId(UPDATED_EMPLOYMENT_TYPE_ID);
        EmployeeDTO employeeDTO = employeeMapper.toDto(updatedEmployee);

        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employeeDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testEmployee.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testEmployee.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testEmployee.getDepartment()).isEqualTo(UPDATED_DEPARTMENT);
        assertThat(testEmployee.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testEmployee.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testEmployee.getEmpUniqueId()).isEqualTo(UPDATED_EMP_UNIQUE_ID);
        assertThat(testEmployee.getJoindate()).isEqualTo(UPDATED_JOINDATE);
        assertThat(testEmployee.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployee.getBranchId()).isEqualTo(UPDATED_BRANCH_ID);
        assertThat(testEmployee.getRegionId()).isEqualTo(UPDATED_REGION_ID);
        assertThat(testEmployee.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmployee.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testEmployee.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testEmployee.getEmploymentTypeId()).isEqualTo(UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void putNonExistingEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employeeDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmployeeWithPatch() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee using partial update
        Employee partialUpdatedEmployee = new Employee();
        partialUpdatedEmployee.setId(employee.getId());

        partialUpdatedEmployee
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .empUniqueId(UPDATED_EMP_UNIQUE_ID)
            .joindate(UPDATED_JOINDATE)
            .companyId(UPDATED_COMPANY_ID)
            .branchId(UPDATED_BRANCH_ID)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployee.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployee))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testEmployee.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testEmployee.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testEmployee.getDepartment()).isEqualTo(DEFAULT_DEPARTMENT);
        assertThat(testEmployee.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testEmployee.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testEmployee.getEmpUniqueId()).isEqualTo(UPDATED_EMP_UNIQUE_ID);
        assertThat(testEmployee.getJoindate()).isEqualTo(UPDATED_JOINDATE);
        assertThat(testEmployee.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployee.getBranchId()).isEqualTo(UPDATED_BRANCH_ID);
        assertThat(testEmployee.getRegionId()).isEqualTo(DEFAULT_REGION_ID);
        assertThat(testEmployee.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEmployee.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testEmployee.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testEmployee.getEmploymentTypeId()).isEqualTo(DEFAULT_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void fullUpdateEmployeeWithPatch() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee using partial update
        Employee partialUpdatedEmployee = new Employee();
        partialUpdatedEmployee.setId(employee.getId());

        partialUpdatedEmployee
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .department(UPDATED_DEPARTMENT)
            .designation(UPDATED_DESIGNATION)
            .gender(UPDATED_GENDER)
            .empUniqueId(UPDATED_EMP_UNIQUE_ID)
            .joindate(UPDATED_JOINDATE)
            .companyId(UPDATED_COMPANY_ID)
            .branchId(UPDATED_BRANCH_ID)
            .regionId(UPDATED_REGION_ID)
            .status(UPDATED_STATUS)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .employmentTypeId(UPDATED_EMPLOYMENT_TYPE_ID);

        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployee.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployee))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testEmployee.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testEmployee.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testEmployee.getDepartment()).isEqualTo(UPDATED_DEPARTMENT);
        assertThat(testEmployee.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testEmployee.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testEmployee.getEmpUniqueId()).isEqualTo(UPDATED_EMP_UNIQUE_ID);
        assertThat(testEmployee.getJoindate()).isEqualTo(UPDATED_JOINDATE);
        assertThat(testEmployee.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testEmployee.getBranchId()).isEqualTo(UPDATED_BRANCH_ID);
        assertThat(testEmployee.getRegionId()).isEqualTo(UPDATED_REGION_ID);
        assertThat(testEmployee.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmployee.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testEmployee.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testEmployee.getEmploymentTypeId()).isEqualTo(UPDATED_EMPLOYMENT_TYPE_ID);
    }

    @Test
    @Transactional
    void patchNonExistingEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, employeeDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setId(count.incrementAndGet());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeDelete = employeeRepository.findAll().size();

        // Delete the employee
        restEmployeeMockMvc
            .perform(delete(ENTITY_API_URL_ID, employee.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
