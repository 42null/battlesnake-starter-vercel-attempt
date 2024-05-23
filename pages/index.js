import Head from "next/head";
import { useEffect } from "react";

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/data');
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}


export default function Home({ data }) {
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/data');
            const result = await res.json();
            console.log(result);
            if(result.message !== "Initial data"){
                updatePageBoard(result.message.getBoard);
            }

        };

        // Fetch data immediately and then at regular intervals
        fetchData();

        const intervalId = setInterval(fetchData, 100); // Poll every 5 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const updatePageBoard = (boardArray) => {
        const table = document.getElementById('display-table');
        const tds = table.getElementsByTagName('td');
        let index = 0;
        for(let i = 0; i < boardArray.length; i++){
            for(let j = 0; j < boardArray[0].length; j++){
                tds[index].innerText = boardArray[i][j].fill;
                index++;
            }
        }
    };

    return (
        <div>
            <Head>
                <title>Sssssssss</title>
            </Head>
        <main>
            <h1>
                This is just a placeholder page - the real magic is happening under /api
            </h1>
            <table id={'display-table'}>
                {/*<thead>*/}
                {/*<tr>*/}
                {/*    <th>head1</th>*/}
                {/*    <th>head2</th>*/}
                {/*    <th>head3</th>*/}
                {/*    <th>head4</th>*/}
                {/*</tr>*/}
                {/*</thead>*/}
                <tbody>
                    <tr>
                        <td id={'00'}></td>
                        <td id={'01'}></td>
                        <td id={'02'}></td>
                        <td id={'03'}></td>
                        <td id={'04'}></td>
                        <td id={'05'}></td>
                        <td id={'06'}></td>
                        <td id={'07'}></td>
                        <td id={'08'}></td>
                        <td id={'09'}></td>
                        <td id={'010'}></td>
                    </tr>
                    <tr>
                        <td id={'10'}></td>
                        <td id={'11'}></td>
                        <td id={'12'}></td>
                        <td id={'13'}></td>
                        <td id={'14'}></td>
                        <td id={'15'}></td>
                        <td id={'16'}></td>
                        <td id={'17'}></td>
                        <td id={'18'}></td>
                        <td id={'19'}></td>
                        <td id={'110'}></td>
                    </tr>
                    <tr>
                        <td id={'20'}></td>
                        <td id={'21'}></td>
                        <td id={'22'}></td>
                        <td id={'23'}></td>
                        <td id={'24'}></td>
                        <td id={'25'}></td>
                        <td id={'26'}></td>
                        <td id={'27'}></td>
                        <td id={'28'}></td>
                        <td id={'29'}></td>
                        <td id={'210'}></td>
                    </tr>
                    <tr>
                        <td id={'30'}></td>
                        <td id={'31'}></td>
                        <td id={'32'}></td>
                        <td id={'33'}></td>
                        <td id={'34'}></td>
                        <td id={'35'}></td>
                        <td id={'36'}></td>
                        <td id={'37'}></td>
                        <td id={'38'}></td>
                        <td id={'39'}></td>
                        <td id={'310'}></td>
                    </tr>
                    <tr>
                        <td id={'40'}></td>
                        <td id={'41'}></td>
                        <td id={'42'}></td>
                        <td id={'43'}></td>
                        <td id={'44'}></td>
                        <td id={'45'}></td>
                        <td id={'46'}></td>
                        <td id={'47'}></td>
                        <td id={'48'}></td>
                        <td id={'49'}></td>
                        <td id={'410'}></td>
                    </tr>
                    <tr>
                        <td id={'50'}></td>
                        <td id={'51'}></td>
                        <td id={'52'}></td>
                        <td id={'53'}></td>
                        <td id={'54'}></td>
                        <td id={'55'}></td>
                        <td id={'56'}></td>
                        <td id={'57'}></td>
                        <td id={'58'}></td>
                        <td id={'59'}></td>
                        <td id={'510'}></td>
                    </tr>
                    <tr>
                        <td id={'60'}></td>
                        <td id={'61'}></td>
                        <td id={'62'}></td>
                        <td id={'63'}></td>
                        <td id={'64'}></td>
                        <td id={'65'}></td>
                        <td id={'66'}></td>
                        <td id={'67'}></td>
                        <td id={'68'}></td>
                        <td id={'69'}></td>
                        <td id={'610'}></td>
                    </tr>
                    <tr>
                        <td id={'70'}></td>
                        <td id={'71'}></td>
                        <td id={'72'}></td>
                        <td id={'73'}></td>
                        <td id={'74'}></td>
                        <td id={'75'}></td>
                        <td id={'76'}></td>
                        <td id={'77'}></td>
                        <td id={'78'}></td>
                        <td id={'79'}></td>
                        <td id={'710'}></td>
                    </tr>
                    <tr>
                        <td id={'80'}></td>
                        <td id={'81'}></td>
                        <td id={'82'}></td>
                        <td id={'83'}></td>
                        <td id={'84'}></td>
                        <td id={'85'}></td>
                        <td id={'86'}></td>
                        <td id={'87'}></td>
                        <td id={'88'}></td>
                        <td id={'89'}></td>
                        <td id={'810'}></td>
                    </tr>
                    <tr>
                        <td id={'90'}></td>
                        <td id={'91'}></td>
                        <td id={'92'}></td>
                        <td id={'93'}></td>
                        <td id={'94'}></td>
                        <td id={'95'}></td>
                        <td id={'96'}></td>
                        <td id={'97'}></td>
                        <td id={'98'}></td>
                        <td id={'99'}></td>
                        <td id={'910'}></td>
                    </tr>
                    <tr>
                        <td id={'100'}></td>
                        <td id={'101'}></td>
                        <td id={'102'}></td>
                        <td id={'103'}></td>
                        <td id={'104'}></td>
                        <td id={'105'}></td>
                        <td id={'106'}></td>
                        <td id={'107'}></td>
                        <td id={'108'}></td>
                        <td id={'109'}></td>
                        <td id={'1010'}></td>
                    </tr>
                </tbody>
                    {/*<tfoot>*/}
                    {/*<tr>*/}
                    {/*    <td>foot1</td>*/}
                    {/*    <td>foot2</td>*/}
                    {/*    <td>foot3</td>*/}
                    {/*    <td>foot4</td>*/}
                    {/*</tr>*/}
                    {/*</tfoot>*/}
            </table>
        </main>
    </div>
    );
}
