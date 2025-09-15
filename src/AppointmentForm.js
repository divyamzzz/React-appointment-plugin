


import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAppointment } from './AppointmentProvider';

export function AppointmentForm({
  orgId: orgIdProp = null,
  onSuccess = () => {},
  onError = () => {},
  className = 'w-full',
  initialValues = {},
}) {
  const { client } = useAppointment();

  const [resourcesData, setResourcesData] = useState([]);
  const [showResources, setShowResources] = useState(false);
  const [resource, setResource] = useState('');
const [customerId, setCustomerId] = useState(initialValues.customerCode ?? '')
  const [slotTime, setSlotTime] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [orgId, setOrgId] = useState(orgIdProp || '');
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await client.getResources();
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : [];
        setResourcesData(arr);
        if (!orgIdProp && arr.length > 0 && (arr[0].OrgId || arr[0].orgId)) {
          setOrgId(arr[0].OrgId ?? arr[0].orgId);
        }
      } catch (err) {
        console.error('Failed to fetch resources', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [client, orgIdProp]);

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setShowResources(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const isValid = customerId.trim() !== '' && resourceId && slot;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Please enter user id, select a resource and pick a slot.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ResourceId: resourceId,
        CustomerCode: customerId,
        OrgId: orgId,
        SlotTime: slotTime,
        SlotDate:slotDate
      };
      const result = await client.createAppointment(payload);
      onSuccess(result);
      alert(`Appointment created. Appointment Id: ${result.appointmentId || 'N/A'}`);
      setCustomerId('');
      setResource('');
      setResourceId('');
      setSlotTime('');
      setSlotDate('');
    } catch (err) {
      console.error(err);
      onError(err);
      alert('Server error creating appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className={className}>
      <div className="p-2 bg-transparent">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="customerId" className="text-sm font-medium">Enter User Id</label>
            <input
              id="customerId"
              name="customerId"
              className="border-2 box-border w-full px-2 py-1 rounded"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={loading}
              aria-required
              readOnly={Boolean(initialValues.customerCode)}
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="resourceInput" className="text-sm font-medium">Select Resource</label>
            <input
              id="resourceInput"
              name="resourceInput"
              className="border-2 box-border w-full px-2 py-1 rounded cursor-pointer focus:outline-none"
              onClick={() => setShowResources((s) => !s)}
              readOnly
              value={resource}
              aria-haspopup="listbox"
              aria-expanded={showResources}
              disabled={loading || resourcesData.length === 0}
              placeholder={resourcesData.length === 0 ? 'Loading...' : 'Choose resource'}
            />

            {showResources && resourcesData.length > 0 && (
              <div role="listbox" aria-label="Resources" className="absolute left-0 w-full max-h-40 overflow-auto border bg-white z-50 mt-1">
                {resourcesData.map((r) => {
                  const rId = r.resourceId ?? r.ResourceId ?? r.id;
                  const rName = r.name ?? r.Name ?? r.displayName ?? rId;
                  return (
                    <div
                      key={rId}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setResource(rName);
                        setResourceId(rId);
                        setShowResources(false);
                      }}
                      role="option"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setResource(rName);
                          setResourceId(rId);
                          setShowResources(false);
                        }
                      }}
                    >
                      {rName} ({rId})
                    </div>
                  );
                })}
              </div>
            )}
          </div>
  <div className="flex flex-col">
            <label htmlFor="slot" className="text-sm font-medium">Select Date</label>
            <input
              id="slot"
              name="slot"
              className="border-2 box-border w-full px-2 py-1 rounded"
              type="date"
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="slot" className="text-sm font-medium">Select Time Slot</label>
            <input
              id="slot"
              name="slot"
              className="border-2 box-border w-full px-2 py-1 rounded"
              type="time"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              disabled={loading}
            />
          </div>
         

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !isValid}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AppointmentForm.propTypes = {
  orgId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
};

export default AppointmentForm;





