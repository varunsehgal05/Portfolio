/**
 * Unified Device Detection Utility for VarunOS
 * Reliably detects Mobile, Tablet (including iPadOS Safari spoofing macOS), and Laptop/Desktop.
 */

export const isMobileOrTabletDevice = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isMobileUA = /iPad|iPhone|iPod|Android/i.test(ua);
  // iPadOS Safari sends 'Macintosh' user-agent by default, but has multi-touch support (> 1)
  const isIPadOS = /Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  const isNarrowScreen = window.innerWidth <= 1024;
  return isMobileUA || isIPadOS || isNarrowScreen;
};

export const isIPadDevice = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iPad/i.test(ua) || (/Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1);
};

export const isPhoneDevice = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iPhone|iPod/i.test(ua) || (!isIPadDevice() && /Android/i.test(ua)) || window.innerWidth <= 640;
};

export const getEffectiveDeviceMode = (windowWidth = (typeof window !== 'undefined' ? window.innerWidth : 1200)) => {
  if (typeof window === 'undefined') return 'desktop';
  if (isPhoneDevice() || windowWidth <= 640) return 'mobile';
  if (isIPadDevice() || windowWidth <= 1024) return 'tablet';
  return 'desktop';
};
