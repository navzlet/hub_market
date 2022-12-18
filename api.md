### auth
/login (post)
{
	"login": "str",
	"password": "str"
}

/register (post)
{
	"login": "str",
	"password": "str",
	"name": "str"
}

### user 
/user/:name || /user/:id
<!---
для поиска пользователей (во вкладке передать)
можно искать по айди или по имени
-->


### shared wallet
/shared_balance/:id (get)


### month wallet
/share (post)
/month_balance/:id (get)


### rating
/raring_senders/mouth (get)
/raring_senders/all_time (get)
/raring_getters/mouth (get)
/raring_getters/all_time (get)


### transaction
/transaction/:id (get)
/transactions/all (get)
/transactions/incoming (get)
/transactions/outcoming (get)



