import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee", minHeight: "100vh", display: "flex", alignItems: "center"}}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://img.freepik.com/free-vector/hand-drawn-illustration-business-planning_52683-76702.jpg?w=996&t=st=1707740541~exp=1707741141~hmac=81482fed7f7a83c6e2cbfff609605c3a6f58eb18f00196a37c4bf400ec24afdf"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Welcome to TaskTrek</h4>
                    </div>

                    {children}
                  </div>
                </div>
                <div className="d-sm-none col-lg-6 d-md-flex align-items-center gradient-custom-2">
                  <div className="px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a todo app</h4>
                    <p className="small mb-0">
                      TaskTrek is your ultimate task management solution
                      designed to help you stay organized, focused, and
                      productive. With TaskTrek, you can effortlessly create,
                      track, and prioritize tasks, ensuring nothing falls
                      through the cracks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
