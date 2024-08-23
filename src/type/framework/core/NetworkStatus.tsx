export interface NetworkStatus {
    effectiveType ?: 'slow-2g' | '2g' | '3g' | '4g';
    downlinkMax   ?: number;
    downlink      ?: number;
    saveData      ?: boolean;
    online         : boolean;
    type          ?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
    rtt           ?: number;
}
