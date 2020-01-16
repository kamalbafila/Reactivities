using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public readonly ILogger<ErrorHandlingMiddleware> _Logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            this._Logger = logger;
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try{
                await _next.Invoke(context);
            }
            catch(Exception ex){
                await HandleExceptionAsync(context,ex,_Logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors =null;
            switch(ex)
            {
                case RestException re:
                logger.LogError(ex,"REST ERROR");
                errors =re.Error;
                context.Response.StatusCode =(int)re.Code;
                break;

                case  Exception e:
                logger.LogError(e,"SERVER ERROR");
                errors =string.IsNullOrWhiteSpace(e.Message) ? "Error": e.Message;
                context.Response.StatusCode =(int) HttpStatusCode.InternalServerError;
                break;
            }

            context.Response.ContentType ="application/json";
            if(errors!=null){
                var result = JsonSerializer.Serialize( new {
                    errors
                });
                await context.Response.WriteAsync(result);
            }
        }
    }
}