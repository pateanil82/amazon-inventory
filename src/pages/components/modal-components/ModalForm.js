import React from "react";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";

const ModalForm = ({ infoToEdit, formSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <div className="form-control-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            id="productName"
            defaultValue={infoToEdit.customProductname ? infoToEdit.customProductname : infoToEdit.productName}
            {...register("productName", { required: "Product name can not be blank" })}
          />
          {errors.productName && <span className="invalid">{errors.productName.message}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Inventory Level Outside Amazon</label>
        <div className="form-control-wrap">
          <input
            type="number"
            className="form-control"
            placeholder="Enter number of units"
            id="outQuantity"
            defaultValue={infoToEdit.outQuantity}
            {...register("outQuantity", { required: "Please enter number of units" })}
          />
          {errors.outQuantity && <span className="invalid">{errors.outQuantity.message}</span>}
        </div>
      </div>
      <div className="form-group d-flex justify-content-end">
        <Button size="md" className="btn" type="submit" color="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ModalForm;