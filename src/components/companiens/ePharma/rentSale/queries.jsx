const Queries = () => {
    return (
        <section className="container bg-gray-100">
            <div className="datatable-scroll py-5">
                <table className="table" style={{
                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', fontSize: '1em', fontFamily: 'Lato', background: 'white' }} >
                    <thead>
                    <tr role="row"> 
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="5%" className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="SL: activate to sort column descending" > 
                            SL 
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="10%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="SOURCE: activate to sort column ascending" >
                            SOURCE
                        </th>
                        <th style={{ borderBottom: "1px solid rgb(225, 225, 225)", width: 100 }} width="10%" className="sorting_disabled" rowSpan={1} colSpan={1} aria-label="Date" >
                            Date
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="10%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="QID: activate to sort column ascending" >
                            QID
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="15%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Query For: activate to sort column ascending" >
                            Query For
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="20%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Customer Details: activate to sort column ascending" >
                            Customer Details
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="40%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Message: activate to sort column ascending" >
                            Message
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="10%" className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Status: activate to sort column ascending" >
                        Status
                        </th>
                        <th style={{ borderBottom: "#E1E1E1 1px solid" }} width="5%" className="text-center sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} aria-label="Actions: activate to sort column ascending" >
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr role="row" className="odd">
                            <td className="sorting_1">1</td>
                            <td>Buyer</td>
                            <td>2025-04-07</td>
                            <td>THUQN1003</td>
                            <td>Home Theater </td>
                            <td>
                                kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                            </td>
                            <td>TEST MESSAGE</td>
                            <td valign="middle">
                                <a href="query_list_electronics.php?page=Pending&mode=update&qid=4&val=Attained">
                                    <font color="red">Pending</font>
                                </a>
                            </td>
                            <td className="text-center" valign="middle">
                                {/*
                                    <a href="query_list_electronics.php?mode=edit&qid=4"><i className="icon-pencil7"></i></a>
                                    &nbsp;
                                    <a href="javascript:void(0)" onClick="func_del('4')" className="on-default remove-row"><i className="icon-bin"></i></a>
                                */}
                                <i className='bx bx-trash' valign="middle"></i>
                            </td>
                        </tr>
                        <tr role="row" className="even">
                            <td className="sorting_1">2</td>
                            <td>Buyer</td>
                            <td>2025-04-07</td>
                            <td>THUQN1002</td>
                            <td>Home Theater </td>
                            <td>
                                kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                            </td>
                            <td>TEST MESSAGE</td>
                            <td align="center" valign="middle">
                                <a href="query_list_electronics.php?page=Pending&mode=update&qid=3&val=Attained">
                                    <font color="red">Pending</font>
                                </a>
                            </td>
                            <td className="text-center" valign="middle">
                                {/*
                                    <a href="query_list_electronics.php?mode=edit&qid=3"><i className="icon-pencil7"></i></a>
                                    &nbsp;
                                    <a href="javascript:void(0)" onClick="func_del('3')" className="on-default remove-row"><i className="icon-bin"></i></a>
                                */}
                                <i className='bx bx-trash'></i>
                            </td>
                        </tr>
                        <tr role="row" className="odd">
                            <td className="sorting_1">3</td>
                            <td>Buyer</td>
                            <td>2025-04-07</td>
                            <td>THUQN1001</td>
                            <td>Home Theater </td>
                            <td>
                                kumar Gautam <br /> MGM@gmail.com <br /> 9163226377
                            </td>
                            <td>TEST MESSAGE</td>
                            <td align="center" valign="middle">
                                <a href="query_list_electronics.php?page=Pending&mode=update&qid=2&val=Attained">
                                    <font color="red">Pending</font>
                                </a>
                            </td>
                            <td className="text-center" valign="middle">
                                {/*
                                    <a href="query_list_electronics.php?mode=edit&qid=2"><i className="icon-pencil7"></i></a>
                                    &nbsp;
                                    <a href="javascript:void(0)" onClick="func_del('2')" className="on-default remove-row"><i className="icon-bin"></i></a>
                                */}
                                <i className='bx bx-trash'></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Queries;