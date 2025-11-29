
'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

const ScheduleMockupPage = () => {
  const [popup, setPopup] = useState<'booked' | 'assigned' | null>(null);

  const handDrawnStyles: React.CSSProperties = {
    fontFamily: '"Comic Sans MS", "Chalkduster", "Marker Felt", sans-serif',
    color: 'black',
    textAlign: 'center' as const,
  };

  const containerStyles: React.CSSProperties = {
    backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook.png')",
    backgroundColor: '#fdfdf6',
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative'
  };

  const mobileScreenStyles: React.CSSProperties = {
    width: '375px', // Approx iPhone width
    height: '812px', // Approx iPhone height
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  };
  
  const contentStyles: React.CSSProperties = {
    ...handDrawnStyles,
    padding: '15px',
    borderLeft: '2px solid #ffaaab',
    backgroundImage: `linear-gradient(to right, transparent 0, transparent 40px, #e0e0e0 41px),
                      repeating-linear-gradient(#fdfdf6, #fdfdf6 23px, #d9eaff 24px, #d9eaff 24px)`,
    backgroundSize: '100% 24px, 100% 24px',
    lineHeight: '24px',
    height: '100%',
    boxSizing: 'border-box'
  };

  const boxStyle: React.CSSProperties = {
    border: '2px solid black',
    padding: '2px 8px',
    display: 'inline-block',
    fontSize: '0.9em',
    lineHeight: '1.2'
  };
  
  const popupBaseStyle: React.CSSProperties = {
      position: 'absolute',
      border: '2px solid black',
      backgroundColor: '#fdfdf6',
      padding: '20px',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '4px 4px 0px #888',
  };

  const closeButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '5px',
      right: '5px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
  };


  return (
    <div style={containerStyles}>
      <div style={mobileScreenStyles}>
        <div style={contentStyles}>
          {/* Header */}
          <div style={{...handDrawnStyles, fontSize: '1.2em', marginBottom: '0'}}>SCHEDULE PAGE</div>
          <div style={{...handDrawnStyles, fontSize: '1.8em', fontWeight: 'bold', marginBottom: '20px', borderBottom: '2px solid black', paddingBottom: '5px'}}>YOUR SCHEDULE</div>

          {/* Calendar Frame */}
          <div style={{border: '4px solid black', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              
              {/* Left Column (Month/Days) */}
              <div style={{width: '20%', borderRight: '2px solid black', paddingRight: '10px'}}>
                <div style={{...boxStyle, borderRadius: '10px', fontSize: '0.8em', writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '8px 2px', marginBottom: '10px'}}>NOVEMBER</div>
                <div style={{fontSize: '1.5em', fontWeight: 'bold', lineHeight: '2.5', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              {/* Right Column (Schedule Bars) */}
              <div style={{width: '80%', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
                 {/* Day 1 */}
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', height: '48px'}}>
                    <div style={{...boxStyle, flex: 1, backgroundColor: '#e0e0e0', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='rgba(0,0,0,0.2)' stroke-width='1'/></svg>")`}}>ASSIGNMENT</div>
                    <div style={{...boxStyle, flex: 1.5, borderRadius: '10px'}}>FREE</div>
                    <div style={{...boxStyle, flex: 1, borderRadius: '15px', position: 'relative'}} onClick={() => setPopup('booked')}>
                      <svg width="20" height="20" style={{position: 'absolute', top: '-10px', right: '-15px', transform: 'rotate(10deg)'}}><path d="M2,2 Q18,2 18,18" stroke="black" fill="transparent" strokeWidth="2"/></svg>
                      BOOKED A WORKER
                    </div>
                </div>
                {/* Day 2 */}
                <div style={{display: 'flex', alignItems: 'center', height: '48px'}}>
                    <div style={{...boxStyle, width: '100%', borderRadius: '15px'}}>FREE</div>
                </div>
                {/* Day 3 */}
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', height: '48px'}}>
                    <div style={{...boxStyle, flex: 1.5, borderRadius: '10px'}} onClick={() => setPopup('booked')}>BOOKED FOR A WORKER</div>
                    <div style={{...boxStyle, flex: 1, borderRadius: '15px'}}>FREE</div>
                </div>
                {/* Day 4 */}
                <div style={{display: 'flex', alignItems: 'center', height: '48px'}}>
                     <div style={{...boxStyle, width: '100%', borderRadius: '15px', backgroundColor: '#e0e0e0', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='rgba(0,0,0,0.2)' stroke-width='1'/></svg>")`}} onClick={() => setPopup('assigned')}>ASSIGNMENT</div>
                </div>
                {/* Day 5 */}
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', height: '48px'}}>
                    <div style={{...boxStyle, flex: 1, backgroundColor: '#e0e0e0', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='rgba(0,0,0,0.2)' stroke-width='1'/></svg>")`}} onClick={() => setPopup('assigned')}>ASSIGNMENT</div>
                    <div style={{...boxStyle, flex: 1.5, borderRadius: '15px'}} onClick={() => setPopup('booked')}>BOOKED A WORKER</div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Popups */}
        {popup === 'booked' && (
          <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
            <div style={{...popupBaseStyle, writingMode: 'vertical-rl', transform: 'rotate(180deg)', top: '150px', right: '10px', padding: '10px 5px', fontSize: '0.8em'}}>BOOKED FOR A WORKER</div>
            <div style={{...popupBaseStyle, top: '250px', left: '50%', transform: 'translateX(-50%)', width: '280px', height: '150px'}}>
              <button onClick={() => setPopup(null)} style={closeButtonStyle}>
                <X size={20} color="black" />
              </button>
              ALL JOB DETAILS THAT THEY POSTED AND BOOKED A WORKER
            </div>
          </div>
        )}

        {popup === 'assigned' && (
           <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
             <div style={{...popupBaseStyle, top: '250px', left: '50%', transform: 'translateX(-50%)', width: '280px', height: '200px'}}>
                <button onClick={() => setPopup(null)} style={closeButtonStyle}>
                    <X size={20} color="black" />
                </button>
                <p>ASSIGNED JOBS FOR ME</p>
                <p style={{marginTop: '15px'}}>WHERE, FOR WHAT, TIME, LOCATION THEY WAS ASSIGNED FOR?</p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleMockupPage;
