import React, { useMemo } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

// Define the shape of the ScreenRect prop, representing the dimensions of the phone's screen.
export type ScreenRect = {
  topPct: number;
  leftPct: number;
  widthPct: number;
  heightPct: number;
};

// Define the props for the PhoneFormMockup component.
type PhoneFormMockupProps = {
  frameSrc: string;
  className?: string;
  onSubmit?: (data: Record<string, string>) => void;
  screenRect?: ScreenRect;
  statusOffset?: number;
  fixedInViewport?: boolean;
  containerHeight?: string;
  maxWidthPx?: number;
};

// Default values for the screen dimensions if not provided by props.
const DEFAULT_SCREEN: ScreenRect = {
  topPct: 8.5,
  leftPct: 6,
  widthPct: 88,
  heightPct: 83,
};

/**
 * A React component that renders a phone-like mockup with a form inside.
 * It's designed to be a visual container for forms or other content, mimicking a mobile device.
 * @param {PhoneFormMockupProps} props - The props for the component.
 */
export const PhoneFormMockup: React.FC<PhoneFormMockupProps> = ({
  frameSrc,
  className,
  onSubmit,
  screenRect = DEFAULT_SCREEN,
  statusOffset = 12,
  fixedInViewport = true,
  containerHeight = '75vh',
  maxWidthPx = 360,
}) => {
  // Memoize the container style for performance, recalculating only when dependencies change.
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      position: fixedInViewport ? 'sticky' : 'relative',
      top: fixedInViewport ? '16px' : undefined,
      width: '100%',
      maxWidth: maxWidthPx,
      margin: '0 auto',
      height: containerHeight,
      overflow: 'hidden',
      borderRadius: 16,
    }),
    [fixedInViewport, containerHeight, maxWidthPx]
  );

  // Memoize the phone frame style.
  const phoneFrameStyle = useMemo<React.CSSProperties>(
    () => ({
      width: '100%',
      height: 'auto',
      display: 'block',
      pointerEvents: 'none',
      userSelect: 'none',
    }),
    []
  );

  // Memoize the screen area style, using dynamic values from the screenRect prop.
  // Template literals are used here to correctly format the percentage values in the style object.
  const screenStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      top: `${screenRect.topPct}%`,
      left: `${screenRect.leftPct}%`,
      width: `${screenRect.widthPct}%`,
      height: `${screenRect.heightPct}%`,
      borderRadius: 14,
      overflow: 'hidden',
      background: '#FFFFFF',
      boxShadow: '0 12px 30px -12px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
    }),
    [screenRect]
  );

  // Define and memoize the status bar style.
  const statusBarStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: statusOffset,
      zIndex: 2,
      pointerEvents: 'none',
    }),
    [statusOffset]
  );

  // Memoize the inner style for the status bar icons and time.
  const statusInnerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      minHeight: 20,
    }),
    []
  );

  // Memoize the form wrapper style, including the dotted background.
  const formWrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 16px 14px',
      overflowY: 'auto',
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

  // Get the current time for the status bar display.
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={className} style={containerStyle}>
      <div style={{ position: 'relative' }}>
        {/* Phone frame full height */}
        <img
          src={frameSrc || '/placeholder.svg'}
          alt="Phone mockup"
          style={phoneFrameStyle}
          draggable={false}
        />

        {/* Top status bar icons (outside the screen) */}
       

        {/* The screen area that holds the content (form) */}
        <div style={screenStyle}>
          {/* A second, internal status bar within the screen, matching the design. */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 10px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>{currentTime}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1F2937' }}>
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={14} />
            </div>
          </div>

          <div style={formWrapperStyle}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#1F2937' }}>
              {'Get a Live call From Nova AI'}
            </h2>

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
    </div>
  );
};

export default PhoneFormMockup;

