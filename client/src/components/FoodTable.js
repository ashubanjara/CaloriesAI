import React from "react";

const TableComponent = ({ data }) => {
    const headers = Object.values(data[0]).map(item => item.displayName)
    const rows = data.map((item) => Object.values(item).map(item => item.value));

    console.log(headers, rows)

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
