// Enterprise Security Monitoring System
// Tracks and analyzes security events for threat detection

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'login_success' | 'login_failure' | 'account_lockout' | 'suspicious_activity';
  userId?: string;
  email?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityMetrics {
  totalEvents: number;
  failedLogins: number;
  accountLockouts: number;
  suspiciousActivities: number;
  lastUpdated: Date;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private metrics: SecurityMetrics = {
    totalEvents: 0,
    failedLogins: 0,
    accountLockouts: 0,
    suspiciousActivities: 0,
    lastUpdated: new Date()
  };

  // Log a security event
  logEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    this.events.push(securityEvent);
    this.updateMetrics(securityEvent);

    // Keep only last 1000 events in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Log to console in development, could be sent to external service in production
    console.log(`[SECURITY] ${securityEvent.type.toUpperCase()}: ${securityEvent.email || 'unknown'} from ${securityEvent.ip}`, {
      severity: securityEvent.severity,
      details: securityEvent.details
    });

    // Alert on critical events
    if (securityEvent.severity === 'critical') {
      this.handleCriticalEvent(securityEvent);
    }
  }

  // Update security metrics
  private updateMetrics(event: SecurityEvent): void {
    this.metrics.totalEvents++;
    
    switch (event.type) {
      case 'login_failure':
        this.metrics.failedLogins++;
        break;
      case 'account_lockout':
        this.metrics.accountLockouts++;
        break;
      case 'suspicious_activity':
        this.metrics.suspiciousActivities++;
        break;
    }
    
    this.metrics.lastUpdated = new Date();
  }

  // Handle critical security events
  private handleCriticalEvent(event: SecurityEvent): void {
    // In production, this could:
    // - Send alerts to security team
    // - Block IP addresses
    // - Trigger additional monitoring
    console.warn(`[CRITICAL SECURITY EVENT] ${event.type}`, event);
  }

  // Get recent events for an IP
  getEventsForIP(ip: string, hours: number = 24): SecurityEvent[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.events.filter(event => 
      event.ip === ip && event.timestamp > cutoff
    );
  }

  // Get recent events for an email
  getEventsForEmail(email: string, hours: number = 24): SecurityEvent[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.events.filter(event => 
      event.email === email && event.timestamp > cutoff
    );
  }

  // Check for suspicious activity patterns
  detectSuspiciousActivity(ip: string, email?: string): boolean {
    const recentEvents = this.getEventsForIP(ip, 1); // Last hour
    const failedLogins = recentEvents.filter(e => e.type === 'login_failure');
    
    // Multiple failed logins from same IP
    if (failedLogins.length >= 5) {
      this.logEvent({
        type: 'suspicious_activity',
        ip,
        email,
        userAgent: 'unknown',
        details: { reason: 'multiple_failed_logins', count: failedLogins.length },
        severity: 'high'
      });
      return true;
    }

    // Multiple account lockouts from same IP
    const lockouts = recentEvents.filter(e => e.type === 'account_lockout');
    if (lockouts.length >= 3) {
      this.logEvent({
        type: 'suspicious_activity',
        ip,
        email,
        userAgent: 'unknown',
        details: { reason: 'multiple_account_lockouts', count: lockouts.length },
        severity: 'critical'
      });
      return true;
    }

    return false;
  }

  // Get current security metrics
  getMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }

  // Get recent events (for admin dashboard)
  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

// Singleton instance
export const securityMonitor = new SecurityMonitor();

// Helper functions for common security events
export const logLoginAttempt = (email: string, ip: string, userAgent: string, success: boolean) => {
  securityMonitor.logEvent({
    type: success ? 'login_success' : 'login_failure',
    email,
    ip,
    userAgent,
    details: { success },
    severity: success ? 'low' : 'medium'
  });
};

export const logAccountLockout = (email: string, ip: string, userAgent: string, reason: string) => {
  securityMonitor.logEvent({
    type: 'account_lockout',
    email,
    ip,
    userAgent,
    details: { reason },
    severity: 'high'
  });
};

export const logSuspiciousActivity = (ip: string, userAgent: string, activity: string, email?: string) => {
  securityMonitor.logEvent({
    type: 'suspicious_activity',
    email,
    ip,
    userAgent,
    details: { activity },
    severity: 'medium'
  });
};
