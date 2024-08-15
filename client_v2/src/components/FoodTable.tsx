import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";

const TableComponent = ({ data }) => {
    const headers = Object.values(data[0]).map((item) => item.displayName);
    const rows = data.map((item) =>
        Object.values(item).map((item) => item.value),
    );

    return (

        <Table aria-label="Nutrition Stats for Food">
        <TableHeader>
        {headers.map((column) =>
            <TableColumn key={column.key}>{column}</TableColumn>
        )}
        </TableHeader>
        <TableBody>
        {rows.map((row, index) =>
            <TableRow key={index}>
            {row.map((cell, index) => (
                <TableCell className="capitalize" key={index}>{cell}</TableCell>
            ))}
            </TableRow>
        )}
        </TableBody>
        </Table>
    );
};

export default TableComponent;

{/* <table cellSpacing="0">
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
</table> */}