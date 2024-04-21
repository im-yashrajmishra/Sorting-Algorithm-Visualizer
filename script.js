
let selectedAlgo = "B";
let selectedSpeed = 100;
let selectedSize = 10;
const arr = new Array();
const sortingIdeas = {
    "B": "Continuously iterate through the list, comparing adjacent elements and swapping them if they're in the wrong order. This process bubbles the largest (or smallest, depending on the sorting order) element to the end of the list in each iteration.",
    "S": "Divide the list into two parts - sorted and unsorted. In each iteration, find the minimum (or maximum) element in the unsorted part and swap it with the first unsorted element. This process selects the smallest (or largest) element and moves it to its correct position.",
    "I": "Maintain a sorted sublist and an unsorted sublist. Iterate through the unsorted sublist, picking one element at a time and inserting it into its correct position in the sorted sublist. This process expands the sorted sublist one element at a time.",
    "M": "Divide the list into smaller sublists until each sublist contains only one element (trivially sorted). Then, repeatedly merge sublists to create new sorted sublists until only one sorted list remains.",
    "Q": "Choose a pivot element from the list and partition the list into two sublists - elements less than the pivot and elements greater than the pivot. Recursively apply this process to the two sublists and combine the sorted sublists with the pivot to obtain the final sorted list."
  };
  const sortingComplexities = {
    "B": {
      "1": "O(n)",
      "2": "O(n^2)",
      "3": "O(n^2)",
      "4": "O(1)"
    },
    "S": {
      "1": "O(n^2)",
      "2": "O(n^2)",
      "3": "O(n^2)",
      "4": "O(1)"
    },
    "I": {
      "1": "O(n)",
      "2": "O(n^2)",
      "3": "O(n^2)",
      "4": "O(1)"
    },
    "M": {
      "1": "O(n log n)",
      "2": "O(n log n)",
      "3": "O(n log n)",
      "4": "O(n)"
    },
    "Q": {
      "1": "O(n log n)",
      "2": "O(n log n)",
      "3": "O(n^2)",
      "4": "O(log n)"
    }
  };

function selectAlgorithm()
{
    const elements1 = document.getElementsByClassName("sort-algo");
    for(let element of elements1)
    {
        element.addEventListener('click', (event)=>{
            document.getElementsByClassName("algorithm-list-text")[0].textContent = element.textContent;
            document.getElementsByClassName("algorithm-heading")[0].textContent = element.textContent;
            selectedAlgo = element.textContent.charAt(0)+"";
            if(document.getElementsByClassName("algorithm-details")[0]!=null)
            {
                document.body.querySelector("main").removeChild(document.getElementsByClassName("algorithm-details")[0]);
            }
        })
    }
    const elements2 = document.getElementsByClassName("sort-speed");
    for(let element of elements2)
    {
        element.addEventListener('click', (event)=>{
            document.getElementsByClassName("speed-text")[0].textContent = element.textContent;
            selectedSpeed = Number.parseInt(element.textContent.toString().charAt(0));
            selectedSpeed=200/selectedSpeed;
        })
    }
    const elements3 = document.getElementsByClassName("array-size");
    for(let element of elements3)
    {
        element.addEventListener('click', (event)=>{
            document.getElementsByClassName("size-text")[0].textContent = element.textContent;
            selectedSize = Number.parseInt(element.textContent.toString());
            shuffleArray();
        })
    }
}


selectAlgorithm();
function shuffleArray()
{
    let str = document.getElementsByClassName("algorithm-heading")[0].textContent;
    document.querySelector("body > main").innerHTML = "";
    document.querySelector("body > main").insertAdjacentHTML("beforeend", `<p class="algorithm-heading">${str}</p>`);
    arr.length=0;
    for(let i=0;i<selectedSize;i++)
        arr.push(30+Math.ceil(Math.random()*370));

    for(let i=1;i<=selectedSize;i++)
    {
        document.querySelector("body > main").insertAdjacentHTML("beforeend", `<div class="box" id="box${i}">${arr[i-1]}</div>`);
        document.getElementsByClassName("box")[i-1].style.height = `${arr[i-1]}px`;
    }
}

async function algorithmDetails()
{
    document.body.querySelector("main").insertAdjacentHTML("afterbegin", `<div class="algorithm-details">
    <div class="algorithm-idea">
        <p class="algorithm-idea-heading">Algorithm Idea</p>
        <p class="algorithm-idea-text">${sortingIdeas[selectedAlgo]}</div>
    <div class="algorithm-complexity">
        <p class="time-complexity-text">Time & Space Complexity:</p>
        <li class="time-complexity-cases">Time Complexity Best Case: ${sortingComplexities[selectedAlgo]["1"]}</li>
        <li class="time-complexity-cases">Time Complexity Average Case: ${sortingComplexities[selectedAlgo]["2"]}</li>
        <li class="time-complexity-cases">Time Complexity Worst Case: ${sortingComplexities[selectedAlgo]["3"]}</li>
        <li class="time-complexity-cases">Space Complexity: ${sortingComplexities[selectedAlgo]["4"]}</li>
    </div>     
</div>`)
}

async function runSelectedAlgorithm()
{
    await algorithmDetails();
    if(selectedAlgo==="B")
    {
        await bubbleSorting();
    }
    else if(selectedAlgo==="S")
    {
        await selectionSorting();
    }
    else if(selectedAlgo==="I")
    {
        await insertionSorting();
    }
    else if(selectedAlgo==="M")
    {
        await mergeSorting();
    }
    else
    {
        await quickSorting();
    }
}




//-----------Bubble Sort Algorithm-----------//

async function bubbleSorting()
{
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const elements = document.getElementsByClassName("box");
    async function sort(j)
    {
        let counter=0; 
        for(let k=0;(k+1)<(selectedSize-j);k++)
        {
            elements[k].style.backgroundColor = "rgb(255, 0, 0)";
            elements[k+1].style.backgroundColor = "rgb(255, 0, 0)";
            await delay(selectedSpeed);
            if(Number.parseInt(elements[k].textContent)>Number.parseInt(elements[k+1].textContent))
            {
                let temp = elements[k].textContent;
                elements[k].textContent = elements[k+1].textContent;
                elements[k+1].textContent = temp;
                elements[k].style.height = elements[k].textContent+"px";
                elements[k+1].style.height = elements[k+1].textContent+"px";
                await delay(selectedSpeed);
                counter++;
            }
            elements[k].style.backgroundColor = "rgb(255, 255, 255)";
            elements[k+1].style.backgroundColor = "rgb(255, 255, 255)";
        }
        return counter;
    }
    let flag=1;
    for(let i=0;i<selectedSize && flag!=0;i++)
    {
        flag = await sort(i);
        await delay(selectedSpeed);
    }
    for(let k=0;k<selectedSize;k++)
    {
        elements[k].style.backgroundColor = "rgb(0, 255, 0)"
        await delay(selectedSpeed/2);
    }
    
}

//-----------Bubble Sort Algorithm-----------//






//-----------Selection Sort Algorithm-----------//

async function selectionSorting()
{
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const elements = document.getElementsByClassName("box");
    async function sort(j)
    {
        let k=j,min=j;
        elements[j].style.backgroundColor = "rgb(255, 165, 0)";
        await delay(selectedSpeed);
        elements[j].style.backgroundColor = "rgb(255, 0, 0)";
        j++;
        while(j<=(selectedSize-1))
        {
            elements[j].style.backgroundColor = "rgb(255, 165, 0)";
            await delay(selectedSpeed);
            if(Number.parseInt(elements[j].textContent)<Number.parseInt(elements[min].textContent))
            {
                elements[min].style.backgroundColor = "rgb(255, 255, 255)";
                elements[j].style.backgroundColor = "rgb(255, 0, 0)";
                min=j;
            }
            else
            {
                elements[j].style.backgroundColor = "rgb(255, 255, 255)";
            }
            j++;
        }
        elements[min].style.backgroundColor = "rgb(255, 255, 255)";
        let temp = elements[min].textContent;
        elements[min].textContent = elements[k].textContent;
        elements[k].textContent = temp;
        elements[min].style.height = elements[min].textContent+"px";
        elements[k].style.height = elements[k].textContent+"px";
        elements[k].style.backgroundColor = "rgb(255, 0, 0)";
        await delay(selectedSpeed);
        elements[k].style.backgroundColor = "rgb(255, 255, 255)";
    }
    for(let i=0;i<selectedSize;i++)
    {
        await sort(i);
        await delay(selectedSpeed);
    }
    for(let k=0;k<selectedSize;k++)
    {
        elements[k].style.backgroundColor = "rgb(0, 255, 0)"
        await delay(selectedSpeed/2);
    }
}

//-----------Selection Sort Algorithm-----------//






//-----------Insertion Sort Algorithm-----------//

async function insertionSorting()
{
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const elements = document.getElementsByClassName("box");
    async function sort(j)
    {
        elements[j].style.backgroundColor = "rgb(255, 0, 0)";
        await delay(selectedSpeed);
        while((j>0)&&(Number.parseInt(elements[j].textContent)<Number.parseInt(elements[j-1].textContent)))
        {
            let temp = elements[j].textContent;
            elements[j].textContent = elements[j-1].textContent;
            elements[j-1].textContent = temp;
            elements[j].style.height = elements[j].textContent+"px";
            elements[j-1].style.height = elements[j-1].textContent+"px";
            elements[j--].style.backgroundColor = "rgb(255, 165, 0)";
            elements[j].style.backgroundColor = "rgb(255, 0, 0)";
            await delay(selectedSpeed);
        }
        for(let k=0;k<selectedSize;k++)
        {
            elements[k].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
    for(let i=0;i<selectedSize;i++)
    {
        await sort(i);
        await delay(selectedSpeed);
    }
    for(let k=0;k<selectedSize;k++)
    {
        elements[k].style.backgroundColor = "rgb(0, 255, 0)"
        await delay(selectedSpeed/2);
    }
}

//-----------Insertion Sort Algorithm-----------//






//-----------Merge Sort Algorithm-----------//

async function mergeSorting()
{
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const elements = document.getElementsByClassName("box");
    async function merge(i, j, k)
    {
        let i1=i, i2=(j+1);
        const brr = new Array();
        while((i1<=j)&&(i2<=k))
        {
            if(Number.parseInt(elements[i1].textContent)>Number.parseInt(elements[i2].textContent))
            {
                brr.push(Number.parseInt(elements[i2].textContent));
                i2++;
            }
            else
            {
                brr.push(Number.parseInt(elements[i1].textContent));
                i1++;
            }
        }
        while(i1<=j)
        {
            brr.push(Number.parseInt(elements[i1].textContent));
            i1++;
        }
        while(i2<=k)
        {
            brr.push(Number.parseInt(elements[i2].textContent));
            i2++;
        }
        i1=0;
        for(j=i;j<=k;j++)
        {
            elements[j].textContent = brr[i1++];
            elements[j].style.height = elements[j].textContent + "px";
            elements[j].style.backgroundColor = "rgb(255, 255, 255)";
        }
        for(j=i;j<=k;j++)
        {
            elements[j].style.backgroundColor = "rgb(255, 255, 0)";
            await delay(selectedSpeed/1.25);
            elements[j].style.backgroundColor = "rgb(255, 255, 255)";
        }
        await delay(2*selectedSpeed);
    }
    async function mergeSort(l, r)
    {
        if(l>=r)    return;
        let m = l + parseInt((r-l)/2);
        await mergeSort(l, m);
        await mergeSort(m+1, r);
        for(let i=l;i<=m;i++)
        {
            elements[i].style.backgroundColor = "rgb(255, 165, 0)";
        }
        for(let i=(m+1);i<=r;i++)
        {
            elements[i].style.backgroundColor = "rgb(255, 0, 0)";
        }
        await delay(4*selectedSpeed);
        await merge(l, m, r);
    }
    await mergeSort(0, (selectedSize-1));
    for(let k=0;k<selectedSize;k++)
    {
        elements[k].style.backgroundColor = "rgb(0, 255, 0)"
        await delay(selectedSpeed/2);
    }
}

//-----------Merge Sort Algorithm-----------//






//-----------Quick Sort Algorithm-----------//

async function quickSorting()
{
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const elements = document.getElementsByClassName("box");
    async function partition(i, j)
    {
        const arr1 = new Array();
        const arr2 = new Array();
        let m = Number.parseInt(elements[i].textContent), k;
        elements[i].style.backgroundColor = "rgb(0, 0, 255)";
        for(k=(i+1);k<=j;k++)
        {
            if(Number.parseInt(elements[k].textContent)<=m)
            {
                arr1.push(elements[k].textContent);
                elements[k].style.backgroundColor = "rgb(255, 255, 0)";
            }
            else
            {
                arr2.push(elements[k].textContent);
                elements[k].style.backgroundColor = "rgb(255, 0, 0)";
            }
            await delay(selectedSpeed);
        }
        k=0;
        while(k<arr1.length)
        {
           elements[i+k].textContent = arr1[k];
           elements[i+k].style.height = elements[i+k].textContent + "px";
           elements[i+k].style.backgroundColor = "rgb(255, 255, 0)"; 
           k++;
        }
        elements[i+k].textContent = m;
        elements[i+k].style.height = elements[i+k].textContent + "px";
        elements[i+k].style.backgroundColor = "rgb(0, 0, 255)";
        k++;
        m=0;
        while(m<arr2.length)
        {
           elements[i+k].textContent = arr2[m];
           elements[i+k].style.height = elements[i+k].textContent + "px";
           elements[i+k].style.backgroundColor = "rgb(255, 0, 0)"; 
           k++;
           m++;
        }
        await delay(4*selectedSpeed);
        for(k=i;k<=j;k++)
        {
            elements[k].style.backgroundColor = "rgb(255, 255, 255)";
        }
        return i+arr1.length;
    }
    async function quickSort(l, r) 
    {
        if (l < r) 
        {
            let m = await partition(l, r);
            await quickSort(l, m-1);
            await quickSort(m+1, r);
        }
    }
    await quickSort(0, (selectedSize-1));
    for(let k=0;k<selectedSize;k++)
    {
        elements[k].style.backgroundColor = "rgb(0, 255, 0)"
        await delay(selectedSpeed/2);
    }
}

//-----------Quick Sort Algorithm-----------//












































