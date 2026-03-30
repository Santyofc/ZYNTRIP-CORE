import React from 'react';

interface StatusBarProps {
  time?: string;
}

export function StatusBar({ time = '9:41' }: StatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-11 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-between px-6 text-white text-sm font-semibold">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        {/* Signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect opacity="0.4" x="0" y="6" width="3" height="6" rx="1" fill="white"/>
          <rect opacity="0.4" x="5" y="4" width="3" height="8" rx="1" fill="white"/>
          <rect x="10" y="2" width="3" height="10" rx="1" fill="white"/>
          <rect x="15" y="0" width="3" height="12" rx="1" fill="white"/>
        </svg>
        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="ml-1">
          <path d="M8.5 12C9.32843 12 10 11.3284 10 10.5C10 9.67157 9.32843 9 8.5 9C7.67157 9 7 9.67157 7 10.5C7 11.3284 7.67157 12 8.5 12Z" fill="white"/>
          <path d="M12.364 7.364C10.5926 5.59263 7.40739 5.59263 5.63602 7.364L6.69669 8.42467C7.88394 7.23742 9.86203 7.23742 11.0493 8.42467L12.364 7.364Z" fill="white"/>
          <path d="M15.364 4.364C12.4404 1.44036 7.55957 1.44036 4.63594 4.364L5.69661 5.42467C7.95633 3.16495 11.7898 3.16495 14.0495 5.42467L15.364 4.364Z" fill="white"/>
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" className="ml-1">
          <rect opacity="0.4" x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="white"/>
          <path opacity="0.4" d="M24 4V9C25.3807 8.34719 25.3807 6.65281 24 6V4Z" fill="white"/>
          <rect x="2" y="2" width="18" height="9" rx="2" fill="white"/>
        </svg>
      </div>
    </div>
  );
}
