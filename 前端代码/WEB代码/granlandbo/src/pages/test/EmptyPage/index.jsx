import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import DashboardMonitor from './DashboardMonitor';
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div
      style={{
        paddingTop: 100,
        textAlign: 'center',
      }}
    >
      <DashboardMonitor />
      <Spin spinning={loading} size="large" />
    </div>
  );
};
