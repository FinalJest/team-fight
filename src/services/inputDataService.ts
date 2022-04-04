import React from 'react';

export const getInput = (selector: string, formRef?: React.RefObject<HTMLFormElement>): HTMLInputElement | null =>
    (formRef?.current ?? document)?.querySelector<HTMLInputElement>(selector);

export const getInputValue = (selector: string, formRef?: React.RefObject<HTMLFormElement>): string | undefined =>
    getInput(selector, formRef)?.value.trim();
