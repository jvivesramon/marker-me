import "./PaymentLoadingStyles.scss";

const PaymentLoading = (): React.ReactElement => {
  return (
    <div className="payment-container" aria-label="loading">
      <span className="payment-loader">Procesando su solicitud de pago...</span>
    </div>
  );
};

export default PaymentLoading;
