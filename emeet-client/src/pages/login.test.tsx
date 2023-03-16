import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';

describe('', () => {
  it('test first text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('E-Meeting')).toBeInTheDocument();
  });
  it('test second text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('รายการการประชุมสำหรับนักศึกษาคณะวิศวกรรมศาสตร์')).toBeInTheDocument();
  });
  it('test third text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('อีเมล')).toBeInTheDocument();
  });
  it('test fourth text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('รหัสผ่าน')).toBeInTheDocument();
  });
  it('test button text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument();
  });
});
