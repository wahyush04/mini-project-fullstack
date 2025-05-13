import { useCallback, useEffect } from 'react';
import { useTryoutSectionStore,useTryoutSectionDetailStore, TryoutSectionService } from '../service/tryout.section.service';
import { useApiError } from './useApi';

export const useTryoutSection = () => {
    const { state, reset } = useTryoutSectionStore();
    const { data: tryoutSections, isLoading, isError, error, status } = state;

    const { getErrorMessage } = useApiError(error);

    const getAllTryoutSections = useCallback(async () => {
        return await TryoutSectionService.getAllTryoutSections();
    }, []);


    useEffect(() => {
        getAllTryoutSections();

        // Cleanup on unmount
        return () => reset();
    }, [getAllTryoutSections, reset]);

    return {
        tryoutSections,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        getAllTryoutSections,
        reset
    };
};

export const useTryoutSectionDetail = () => {
    const { state, reset } = useTryoutSectionDetailStore();
    const { data: tryoutSection, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const getTryoutSectionbyId = useCallback(async (id: string) => {
        return await TryoutSectionService.getTryoutSection(id);
    }, []);

    return {
        tryoutSection,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        getTryoutSectionbyId,
        reset
    };
};