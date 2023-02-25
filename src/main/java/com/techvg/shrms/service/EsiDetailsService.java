package com.techvg.shrms.service;

import com.techvg.shrms.domain.EsiDetails;
import com.techvg.shrms.repository.EsiDetailsRepository;
import com.techvg.shrms.service.dto.EsiDetailsDTO;
import com.techvg.shrms.service.mapper.EsiDetailsMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EsiDetails}.
 */
@Service
@Transactional
public class EsiDetailsService {

    private final Logger log = LoggerFactory.getLogger(EsiDetailsService.class);

    private final EsiDetailsRepository esiDetailsRepository;

    private final EsiDetailsMapper esiDetailsMapper;

    public EsiDetailsService(EsiDetailsRepository esiDetailsRepository, EsiDetailsMapper esiDetailsMapper) {
        this.esiDetailsRepository = esiDetailsRepository;
        this.esiDetailsMapper = esiDetailsMapper;
    }

    /**
     * Save a esiDetails.
     *
     * @param esiDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public EsiDetailsDTO save(EsiDetailsDTO esiDetailsDTO) {
        log.debug("Request to save EsiDetails : {}", esiDetailsDTO);
        EsiDetails esiDetails = esiDetailsMapper.toEntity(esiDetailsDTO);
        esiDetails = esiDetailsRepository.save(esiDetails);
        return esiDetailsMapper.toDto(esiDetails);
    }

    /**
     * Update a esiDetails.
     *
     * @param esiDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public EsiDetailsDTO update(EsiDetailsDTO esiDetailsDTO) {
        log.debug("Request to update EsiDetails : {}", esiDetailsDTO);
        EsiDetails esiDetails = esiDetailsMapper.toEntity(esiDetailsDTO);
        esiDetails = esiDetailsRepository.save(esiDetails);
        return esiDetailsMapper.toDto(esiDetails);
    }

    /**
     * Partially update a esiDetails.
     *
     * @param esiDetailsDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EsiDetailsDTO> partialUpdate(EsiDetailsDTO esiDetailsDTO) {
        log.debug("Request to partially update EsiDetails : {}", esiDetailsDTO);

        return esiDetailsRepository
            .findById(esiDetailsDTO.getId())
            .map(existingEsiDetails -> {
                esiDetailsMapper.partialUpdate(existingEsiDetails, esiDetailsDTO);

                return existingEsiDetails;
            })
            .map(esiDetailsRepository::save)
            .map(esiDetailsMapper::toDto);
    }

    /**
     * Get all the esiDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EsiDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EsiDetails");
        return esiDetailsRepository.findAll(pageable).map(esiDetailsMapper::toDto);
    }

    /**
     * Get one esiDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EsiDetailsDTO> findOne(Long id) {
        log.debug("Request to get EsiDetails : {}", id);
        return esiDetailsRepository.findById(id).map(esiDetailsMapper::toDto);
    }

    /**
     * Delete the esiDetails by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EsiDetails : {}", id);
        esiDetailsRepository.deleteById(id);
    }
}
