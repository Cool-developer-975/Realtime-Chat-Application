export async function postData(obj, login){
        try{
          const response = await fetch(`/${(login)?`login`:`signup`}`,{
              method:"POST",
              headers:{
                  "Content-Type":"application/json",
              },
              body:JSON.stringify(obj),
          });
          const data = await response.json();
          if(response.ok){
              const {userName} = data;
              window.location.href = `/userpage?userName=${userName}`;
          }
          else{
              throw new Error(`${data.error}`);
          }
        }
        catch(err){
            alert(err.message);
        }
      }