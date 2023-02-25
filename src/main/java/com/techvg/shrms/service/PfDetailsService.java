package com.techvg.shrms.service;

import com.techvg.shrms.domain.PfDetails;
import com.techvg.shrms.repository.PfDetailsRepository;
import com.techvg.shrms.service.dto.PfDetailsDTO;
import com.techvg.shrms.service.mapper.PfDetailsMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PfDetails}.
 */
@Service
@Transactional
public class PfDetailsService {

    private final Logger log = LoggerFactory.getLogger(PfDetailsService.class);

    private final PfDetailsRepository pfDetailsRepository;

    private final PfDetailsMapper pfDetailsMapper;

    public PfDetailsService(PfDetailsRepository pfDetailsRepository, PfDetailsMapper pfDetailsMapper) {
        this.pfDetailsRepository = pfDetailsRepository;
        this.pfDetailsMapper = pfDetailsMapper;
    }

    /**
     * Save a pfDetails.
     *
     * @param pfDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public PfDetailsDTO save(PfDetailsDTO pfDetailsDTO) {
        log.debug("Request to save PfDetails : {}", pfDetailsDTO);
        PfDetails pfDetails = pfDetailsMapper.toEntity(pfDetailsDTO);
        pfDetails = pfDetailsRepository.save(pfDetails);
        return pfDetailsMapper.toDto(pfDetails);
    }

    /**
     * Update a pfDetails.
     *
     * @param pfDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public PfDetailsDTO update(PfDetailsDTO pfDetailsDTO) {
        log.debug("Request to update PfDetails : {}", pfDetailsDTO);
        PfDetails pfDetails = pfDetailsMapper.toEntity(pfDetailsDTO);
        pfDetails = pfDetailsRepository.save(pfDetails);
        return pfDetailsMapper.toDto(pfDetails);
    }

    /**
     * Partially update a pfDetails.
     *
     * @param pfDetailsDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PfDetailsDTO> partialUpdate(PfDetailsDTO pfDetailsDTO) {
        log.debug("Request to partially update PfDetails : {}", pfDetailsDTO);

        return pfDetailsRepository
            .findById(pfDetailsDTO.getId())
            .map(existingPfDetails -> {
                pfDetailsMapper.partialUpdate(existingPfDetails, pfDetailsDTO);

                return existingPfDetails;
            })
            .map(pfDetailsRepository::save)
            .map(pfDetailsMapper::toDto);
    }

    /**
     * Get all the pfDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PfDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PfDetails");
        return pfDetailsRepository.findAll(pageable).map(pfDetailsMapper::toDto);
    }

    /**
     * Get one pfDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PfDetailsDTO> findOne(Long id) {
        log.debug("Request to get PfDetails : {}", id);
        return pfDetailsRepository.findById(id).map(pfDetailsMapper::toDto);
    }

    /**
     * Delete the pfDetails by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PfDetails : {}", id);
        pfDetailsRepository.deleteById(id);
    }
}
