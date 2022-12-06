![Flowchart](https://user-images.githubusercontent.com/85881151/205952174-8cfbbbb7-fb79-45e1-b48a-5a2e648e3db2.jpg)







# აპლიკაციაში ვიყენებ json server-ს,რომელსაც ვსტარტავ 8000 პორტზე
json-server --watch data/db.json --port 8000






შექმენით აპლიკაცია, რომლის საშუალებითაც შევავსებთ მომხმარებლების ბაზას. დაგვჭირდება ოთხი გვერდი:

1.	კატეგორიების გვერდი - მონაცემების დამატება/ცვლილება ხდება popup-ის გამოყენებით:
 ფილტრის ნაწილი
	დასახელება (contains)
 ცხრილის ნაწილი (Pagination-ით)
	დასახელება
2.	მომხმარებლის სტატუსების გვერდი - მონაცემების დამატება/ცვლილება ხდება popup-ის გამოყენებით:
 ფილტრის ნაწილი
	დასახელება (contains)
 ცხრილის ნაწილი (Pagination-ით)
	დასახელება
3.	მომხმარებლების სიის გვერდი - მონაცემების დამატება/ცვლილება ხდება ცალკე გვერდის გამოყენებით (არა - popup-ის გამოყენებით):
 ფილტრის ნაწილი
	ელ.ფოსტა (contains)
	პირადი ნომერი (equals)
	სახელი (contains)
	გვარი (contains)
	დაბადების თარიღი (დაწყების თარიღი - დამთავრების თარიღი)
	კატეგორია (equals)
	სტატუსი (equals)
 ცხრილის ნაწილი
	ელ. ფოსტა
	პირადი ნომერი
	სახელი
	გვარი
	დაბადების თარიღი (dd/MM/yyyy ფორმატში)
	კატეგორია
სტატუსი

4.	მომხმარებლის დეტალების გვერდი, საიდანაც შევძლებთ ახალი მომხარებლის დამატებას ან არსებულის ცვლილებას და შენახვას.
 ველები:
	ელ. ფოსტა (text input)
	პირადი ნომერი (text input)
	სახელი (text input)
	გვარი (text input)
	დაბადების თარიღი (datetime)
	კატეგორია (dropdown)
	სტატუსი (dropdown)

აპლიკაციის შექმნის წესები:

	აპლიკაცია უნდა შეიქმნას Angular 11+ Framework-ზე
	უნდა გამოიყენოთ Angular Modules
	უნდა გამოიყენოთ Angular Routing
	უნდა გამოიყენოთ Angular Forms (Template Driven ან Reactive, თქვენი გემოვნებით)
	ყურადღებას მივაქცევთ ვიზუალურ მხარესაც: შეგიძლიათ შექმნათ თქვენი კომპონენტები (ჩაითვლება უპირატესობად - Inputs, Button etc.) ან გამოიყენოთ ანგულარის UI Library-ებიდან რომელიმე, მაგ: Primeng, Angular Material, NGX Bootstrap ან ნებისმიერი თქვენი გემოვნებით
	მონაცემები უნდა შეინახოთ სერვერზე, შესაბამისად მოგიწევთ Angular HttpClient-ის გამოყენებით REST API-სთან მუშაობა. შეარჩიეთ თქვენი გემოვნებით: რომელიმე Mock Server, JSON Server (npm), NodeJs Server (ჩაითვლება უპირატესობად)

