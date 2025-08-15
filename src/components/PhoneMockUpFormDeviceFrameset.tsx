import React, { useMemo } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFormMockupDeviceFramSetProps {
  className?: string;
  onSubmit?: (data: Record<string, string>) => void;
  maxWidthPx?: number;
}

const PhoneFormMockupDeviceFramSet: React.FC<PhoneFormMockupDeviceFramSetProps> = ({
  className,
  onSubmit,
  maxWidthPx = 300,
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  
  // Memoize the form wrapper style, including the dotted background.
  const formWrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 16px 14px',
      overflowY: 'auto',
      marginLeft: '-10px',
      backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
      backgroundSize: '12px 12px',
    }),
    []
  );

  // Define the form submission handler.
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries()) as Record<string, string>;
    onSubmit?.(payload);
  };


  return (
    <div
  className='justify-center'
  style={{  margin: '0', paddingLeft: '-' }}
>

<div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>


<DeviceFrameset
  device="iPhone X"
  color="black"
  landscape={false}
  zoom={window.innerWidth < 500 ? 0.97 : 1}
  width={window.innerWidth < 500 ? 330 : 375}// Set the width of the device frame
  style={{ margin: 0 }}
>
  
        {/* Inner content behaves like a real phone screen */}
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#fff' }}>
          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{currentTime}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <Signal size={14} /><Wifi size={14} /><Battery size={14} />
            </div>
          </div>
          {/* Form */}
          <div style={{ padding: '14px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Get a Live call From Nova AI</h2>
            
          <div style={formWrapperStyle}>
                     <form
              onSubmit={onFormSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: '100%' }}
            >
              <div style={{ display: 'grid', gap: 4 }}>
                <label htmlFor="email" style={{ fontSize: 11, fontWeight: 600, color: '#1F2937' }}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  style={{
                    width: '100%',
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: 4 }}>
                <label htmlFor="firstName" style={{ fontSize: 11, fontWeight: 600, color: '#1F2937' }}>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  style={{
                    width: '100%',
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: 4 }}>
                <label htmlFor="lastName" style={{ fontSize: 11, fontWeight: 600, color: '#1F2937' }}>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  style={{
                    width: '100%',
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: 4 }}>
                <label htmlFor="company" style={{ fontSize: 11, fontWeight: 600, color: '#1F2937' }}>Company</label>
                <input
                  id="company"
                  name="company"
                  style={{
                    width: '100%',
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: 4 }}>
                <label htmlFor="phone" style={{ fontSize: 11, fontWeight: 600, color: '#1F2937' }}>Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  inputMode="tel"
                  style={{
                    width: '100%',
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.2)',
                    outline: 'none',
                    padding: '0 10px',
                    fontSize: 12,
                  }}
                />
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: 38,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgb(0,191,255), rgb(0,168,230))',
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 18px -10px rgba(0,191,255,0.45)',
                  }}
                >
                  {'Send It'}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </DeviceFrameset>
  </div>
    </div>
  );
};

export default PhoneFormMockupDeviceFramSet;
