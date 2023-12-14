import React, { useState, useEffect } from 'react';
import './ViewPDF.css';
import { collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../Firebase';

function ViewPDF() {
    const [pdfUrls, setPdfUrls] = useState([]);

    useEffect(() => {
        const fetchPdfUrls = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const pdfsCollectionRef = collection(db, 'Users', user.uid, 'PDFs');
                    const pdfsQuery = query(pdfsCollectionRef);
                    const pdfsSnapshot = await getDocs(pdfsQuery);

                    if (!pdfsSnapshot.empty) {
                        const pdfUrlsArray = pdfsSnapshot.docs.map((doc) => doc.data().pdfURL);
                        setPdfUrls(pdfUrlsArray);
                    }
                }
            } catch (error) {
                console.error('Error fetching PDF URLs: ', error);
            }
        };

        fetchPdfUrls();
    }, []);

    const handleDownloadClick = (pdfUrl) => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'classification_result.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="widgett">
            <div className='headingg'>
                <h2>PDF Viewer</h2>
            </div>

            {pdfUrls.length > 0 ? (
                <div className='history button-wrapperr'>
                    {pdfUrls.map((pdfUrl, index) => (
                        <button
                            key={index}
                            onClick={() => handleDownloadClick(pdfUrl)}
                            style={{ backgroundColor: '#538aab', margin: '15px 0px 10px 0px' }}
                            className='button-chooseenn'
                        >
                            {index + 1} : Download PDF
                        </button>
                    ))}
                </div>
            ) : (
                <p>No PDF URLs available</p>
            )}
        </div>
    );
}

export default ViewPDF;
