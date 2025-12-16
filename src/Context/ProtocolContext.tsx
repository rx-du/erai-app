import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProtocolState {
  protocolId: string | null;
  protocolData: any | null;
  icon: any | null;
  isMinimized: boolean;
  currentStepIndex: number;
  completedSteps: number[];
  compressions: number;
}

interface ProtocolContextType {
  protocolState: ProtocolState;
  setProtocolMinimized: (minimized: boolean) => void;
  setCurrentProtocol: (protocolId: string, protocolData: any, icon?: any) => void;
  setCurrentStepIndex: (index: number) => void;
  addCompletedStep: (stepId: number) => void;
  removeCompletedStep: (stepId: number) => void;
  clearProtocol: () => void;
  isProtocolActive: (protocolId: string) => boolean;
  setCompressions: (index: number) => void;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

export const ProtocolProvider = ({ children }: { children: ReactNode }) => {
  const [protocolState, setProtocolState] = useState<ProtocolState>({
    protocolId: null,
    protocolData: null,
    icon: null,
    isMinimized: false,
    currentStepIndex: 0,
    completedSteps: [],
    compressions: 30,
  });

  const setProtocolMinimized = (minimized: boolean) => {
    setProtocolState((prev) => ({ ...prev, isMinimized: minimized }));
  };

  const setCurrentProtocol = (protocolId: string, protocolData: any, icon?: any) => {
    setProtocolState((prev) => {
      if (prev.protocolId !== protocolId) {
        return {
          protocolId,
          protocolData,
          icon: icon || null,
          isMinimized: false,
          currentStepIndex: 0,
          completedSteps: [],
          compressions: 30,
        };
      }
      return prev;
    });
  };

  const setCurrentStepIndex = (index: number) => {
    setProtocolState((prev) => ({ ...prev, currentStepIndex: index }));
  };

  const setCompressions = (index: number) => {
    setProtocolState((prev) => ({
      ...prev,
      compressions: prev.compressions + index,
    }));
  };

  const addCompletedStep = (stepId: number) => {
    setProtocolState((prev) => {
      if (!prev.completedSteps.includes(stepId)) {
        return { ...prev, completedSteps: [...prev.completedSteps, stepId] };
      }
      return prev;
    });
  };

  const removeCompletedStep = (stepId: number) => {
    setProtocolState((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.filter((id) => id !== stepId),
    }));
  };

  const clearProtocol = () => {
    setProtocolState({
      protocolId: null,
      protocolData: null,
      icon: null,
      isMinimized: false,
      currentStepIndex: 0,
      completedSteps: [],
      compressions: 30,
    });
  };

  const isProtocolActive = (protocolId: string) => {
    return protocolState.protocolId === protocolId;
  };

  return (
    <ProtocolContext.Provider
      value={{
        protocolState,
        setProtocolMinimized,
        setCurrentProtocol,
        setCurrentStepIndex,
        addCompletedStep,
        removeCompletedStep,
        clearProtocol,
        isProtocolActive,
        setCompressions,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocol = () => {
  const context = useContext(ProtocolContext);
  if (context === undefined) {
    throw new Error('useProtocol must be used within a ProtocolProvider');
  }
  return context;
};
