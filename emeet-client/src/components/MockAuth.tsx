import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MockUser {
  email: string;
  uid: string;
}

interface MockAuthContextType {
  currentUser: MockUser | null;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within MockAuthProvider');
  }
  return context;
};

interface MockAuthProviderProps {
  children: ReactNode;
}

export const MockAuthProvider: React.FC<MockAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - accept any PSU email
    if (email.includes('@psu.ac.th')) {
      setCurrentUser({
        email,
        uid: `mock-uid-${Date.now()}`
      });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signInWithEmailAndPassword,
    signOut
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};