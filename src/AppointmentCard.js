import React from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';

export function AppointmentCard({
  title = 'Book Appointment',
  subtitle = '',
  cardClassName=' ',
  wrapperClassName='' ,
  style = {},
  formProps = {},
}) {
  return (
    <div className={wrapperClassName}>
      <div className={cardClassName} style={style} role="region" aria-label={title}>
        <header className="mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </header>

        <AppointmentForm className="w-full" {...formProps} />
      </div>
    </div>
  );
}

AppointmentCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cardClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  style: PropTypes.object,
  formProps: PropTypes.object,
};

export default AppointmentCard;