import React from "react";
import { Link } from "react-router-dom";
import { Block, BlockContent } from "../../components/Component";
import { Button } from "reactstrap";

const RuntimeError = () => {
    return (
        <>
            <Block className="nk-block-middle wide-md mx-auto" >
                <BlockContent className="nk-error-ld text-center">
                    <div className="wide-xs mx-auto d-flex flex-column   justify-content-center align-item-center" style={{height:'90vh'}}>
                        <h3 className="nk-error-title">Oops! Something went wrong.</h3>
                        <p className="nk-error-text">
                            We apologize for the inconvenience. Our team has been notified and we are
                            working to fix the issue. Please try again later.
                        </p>
                        <Link to={`/login`}>
                            <Button color="primary" size="lg" className="mt-2" onClick={()=>{window.location.reload()}}>
                                Back
                            </Button>
                        </Link>
                    </div>
                </BlockContent>
            </Block>
        </>
    );
};
export default RuntimeError;