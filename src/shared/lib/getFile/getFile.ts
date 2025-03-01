export async function GetFile(Url: any, Name: any) {
  try {
    fetch(Url, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', Name);
        console.log(url);
        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link!.parentNode!.removeChild(link);
      });
  } catch (error) {
    console.error(error);
  }
}
