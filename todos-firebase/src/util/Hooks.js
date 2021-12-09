import { useRef, useEffect, useCallback } from 'react';
import { CancelToken, isCancel } from 'axios';

export const useCancelToken = () => {
    const axiosSource = useRef(null);
    const newCancelToken = useCallback(() => {
    axiosSource.current = CancelToken.source();
    return axiosSource.current.token;
    }, []);

    useEffect(
    () => () => {
        if (axiosSource.current) axiosSource.current.cancel();
    },[]);

    return { newCancelToken, isCancel };
};